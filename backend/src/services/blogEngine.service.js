import { StatusCodes } from 'http-status-codes';
import CMS from '../models/cms.model.js';
import ApiError from '../utils/ApiError.js';
import logger from '../config/logger.js';

/**
 * BLOG & SEO INFRASTRUCTURE ENGINE
 * Manages the content lifecycle, SEO optimization, and structured data for the public blog.
 */
class BlogEngineService {
  /**
   * Create or update blog post
   */
  async savePost(postData, options = {}) {
    const { slug } = postData;
    
    // Auto-generate SEO metadata if missing
    if (!postData.metadata) {
      postData.metadata = {
        title: postData.title,
        description: postData.excerpt,
        keywords: postData.tags?.join(', ')
      };
    }

    const post = await CMS.findOneAndUpdate(
      { slug, type: 'blog', status: options.publish ? 'published' : 'draft' },
      { ...postData, type: 'blog' },
      { upsert: true, new: true }
    );

    logger.info(`[BlogEngine] Post saved: ${slug}`);
    return post;
  }

  /**
   * Get filtered posts for public website
   */
  async getPublicPosts(filters = {}) {
    const query = { type: 'blog', status: 'published' };
    
    if (filters.category) query.category = filters.category;
    if (filters.tag) query.tags = filters.tag;
    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    const posts = await CMS.find(query)
      .sort({ publishedAt: -1 })
      .limit(filters.limit || 10)
      .skip(filters.skip || 0);

    return {
      results: posts,
      total: await CMS.countDocuments(query)
    };
  }

  /**
   * Generate Sitemap Data
   */
  async generateSitemap() {
    const entries = await CMS.find({ status: 'published' }, 'slug updatedAt type');
    return entries.map(e => ({
      url: `/${e.type}/${e.slug}`,
      lastmod: e.updatedAt,
      changefreq: 'weekly',
      priority: e.type === 'service' ? 1.0 : 0.8
    }));
  }

  /**
   * Get related content
   */
  async getRelatedPosts(postId, limit = 3) {
    const post = await CMS.findById(postId);
    if (!post) return [];

    return await CMS.find({
      _id: { $ne: postId },
      type: 'blog',
      status: 'published',
      tags: { $in: post.tags }
    }).limit(limit);
  }
}

export default new BlogEngineService();
