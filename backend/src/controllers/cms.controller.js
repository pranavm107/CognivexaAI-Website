import { Service, Portfolio, TeamMember, Notification, Settings } from '../models/cms.model.js';
import catchAsync from '../utils/catchAsync.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { emitToAdmin } from '../services/socket.service.js';
import websiteCMS from '../services/websiteCMS.service.js';
import blogEngine from '../services/blogEngine.service.js';

// Generic CRUD factory-ish logic
const getCmsItem = (Model) => catchAsync(async (req, res) => {
  const filter = { isDeleted: false };
  if (req.query.status) filter.status = req.query.status;
  
  const items = await Model.find(filter).sort({ createdAt: -1 });
  res.send({ success: true, results: items });
});

const createCmsItem = (Model, eventName) => catchAsync(async (req, res) => {
  const item = await Model.create(req.body);
  emitToAdmin(eventName, item);
  res.status(StatusCodes.CREATED).send({ success: true, data: item });
});

const updateCmsItem = (Model, eventName) => catchAsync(async (req, res) => {
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found');
  emitToAdmin(eventName, item);
  res.send({ success: true, data: item });
});

const deleteCmsItem = (Model, eventName) => catchAsync(async (req, res) => {
  const item = await Model.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
  if (!item) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found');
  emitToAdmin(eventName, { id: req.params.id, deleted: true });
  res.send({ success: true, message: 'Deleted successfully' });
});

// Services
export const getServices = getCmsItem(Service);
export const createService = createCmsItem(Service, 'service_updated');
export const updateService = updateCmsItem(Service, 'service_updated');
export const deleteService = deleteCmsItem(Service, 'service_updated');

// Portfolio
export const getPortfolio = getCmsItem(Portfolio);
export const createPortfolio = createCmsItem(Portfolio, 'portfolio_updated');
export const updatePortfolio = updateCmsItem(Portfolio, 'portfolio_updated');
export const deletePortfolio = deleteCmsItem(Portfolio, 'portfolio_updated');

// Team
export const getTeam = getCmsItem(TeamMember);
export const createTeamMember = createCmsItem(TeamMember, 'team_updated');
export const updateTeamMember = updateCmsItem(TeamMember, 'team_updated');
export const deleteTeamMember = deleteCmsItem(TeamMember, 'team_updated');

// Notifications
export const getNotifications = catchAsync(async (req, res) => {
  const notes = await Notification.find().sort({ createdAt: -1 }).limit(50);
  res.send({ success: true, results: notes });
});

export const markNotificationRead = catchAsync(async (req, res) => {
  const note = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.send({ success: true, data: note });
});

export const getSettings = catchAsync(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.send({ success: true, data: settings });
});

export const updateSettings = catchAsync(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(req.body);
  } else {
    settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
  }
  emitToAdmin('settings_updated', settings);
  res.send({ success: true, data: settings });
});

// Public Getters (Only Active/Published)
export const getPublicServices = catchAsync(async (req, res) => {
  const services = await Service.find({ status: 'active', isDeleted: false }).sort({ createdAt: -1 });
  res.send({ success: true, results: services });
});

export const getPublicPortfolio = catchAsync(async (req, res) => {
  const portfolio = await Portfolio.find({ status: 'published', isDeleted: false }).sort({ createdAt: -1 });
  res.send({ success: true, results: portfolio });
});

export const getPublicTeam = catchAsync(async (req, res) => {
  const team = await TeamMember.find({ isDeleted: false }).sort({ joinedAt: 1 });
  res.send({ success: true, results: team });
});

export const getPublicSettings = catchAsync(async (req, res) => {
  const settings = await Settings.findOne().select('general branding seo');
  res.send({ success: true, data: settings });
});

// Advanced CMS Synchronization
export const getContentBySlug = catchAsync(async (req, res) => {
  const content = await websiteCMS.getPublicContent(req.params.slug, {
    preview: req.query.preview === 'true',
    isAdmin: req.user?.role === 'admin'
  });
  res.send({ success: true, data: content });
});

export const getSEOMetadata = catchAsync(async (req, res) => {
  const metadata = await websiteCMS.getSEOMetadata(req.params.slug);
  res.send({ success: true, data: metadata });
});

// Blog & Resource Engine
export const getBlogPosts = catchAsync(async (req, res) => {
  const result = await blogEngine.getPublicPosts(req.query);
  res.send({ success: true, ...result });
});

export const getBlogPost = catchAsync(async (req, res) => {
  const post = await websiteCMS.getPublicContent(req.params.slug, { type: 'blog' });
  const related = await blogEngine.getRelatedPosts(post._id);
  res.send({ success: true, data: post, related });
});

export const getSitemap = catchAsync(async (req, res) => {
  const sitemap = await blogEngine.generateSitemap();
  res.send({ success: true, results: sitemap });
});

