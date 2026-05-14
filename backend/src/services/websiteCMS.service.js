import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import CMS from '../models/cms.model.js';
import logger from '../config/logger.js';
import eventBus from './eventBus.service.js';

/**
 * WEBSITE CMS SERVICE
 * Synchronizes administrative content with the public-facing website.
 */
class WebsiteCMSService {
  /**
   * Get public content for a specific section or page
   */
  async getPublicContent(slug, options = {}) {
    const query = { slug, status: 'published' };
    
    // Support for draft/preview mode if authenticated
    if (options.preview && options.isAdmin) {
      delete query.status;
    }

    const content = await CMS.findOne(query).sort({ version: -1 });
    if (!content) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Content not found');
    }

    return content;
  }

  /**
   * Publish content and propagate changes
   */
  async publishContent(slug, versionId) {
    const content = await CMS.findOne({ slug, _id: versionId });
    if (!content) throw new ApiError(StatusCodes.NOT_FOUND, 'Version not found');

    // Unpublish previous versions
    await CMS.updateMany({ slug, status: 'published' }, { status: 'archived' });

    content.status = 'published';
    content.publishedAt = new Date();
    await content.save();

    // Propagate to realtime listeners
    eventBus.emit('website.content_updated', {
      slug,
      type: content.type,
      timestamp: new Date()
    });

    logger.info(`[CMS] Content published: ${slug} (v${content.version})`);
    return content;
  }

  /**
   * Support for dynamic structured data and SEO
   */
  async getSEOMetadata(slug) {
    const content = await this.getPublicContent(slug);
    return {
      title: content.metadata?.title || content.title,
      description: content.metadata?.description,
      keywords: content.metadata?.keywords,
      structuredData: this.generateStructuredData(content),
      ogImage: content.metadata?.ogImage || content.featuredImage
    };
  }

  generateStructuredData(content) {
    // Generate JSON-LD based on content type
    const base = {
      "@context": "https://schema.org",
      "@type": content.type === 'blog' ? 'BlogPosting' : 'WebPage',
      "headline": content.title,
      "datePublished": content.publishedAt,
      "image": content.featuredImage
    };

    if (content.type === 'service') {
      base["@type"] = "Service";
      base["serviceType"] = content.title;
      base["description"] = content.excerpt;
    }

    return base;
  }

  /**
   * Scheduled Publishing Check
   * (Usually called by a cron job)
   */
  async processScheduledPublishing() {
    const now = new Date();
    const scheduled = await CMS.find({
      status: 'scheduled',
      scheduledAt: { $lte: now }
    });

    for (const item of scheduled) {
      await this.publishContent(item.slug, item._id);
    }
  }
}

export default new WebsiteCMSService();
