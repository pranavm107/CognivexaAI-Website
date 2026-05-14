import Client from '../models/Client.model.js';
import User from '../models/User.model.js';
import Project from '../models/Project.model.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

/**
 * Enterprise Onboarding Service
 * Orchestrates the transition from sign-up to operational readiness.
 */
export const onboardingService = {
  /**
   * Initialize a new Enterprise Workspace
   */
  initializeWorkspace: async (organizationId, creatorId) => {
    const org = await Client.findById(organizationId);
    if (!org) throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found');

    // 1. Create Sample Project to guide user
    const sampleProject = await Project.create({
      title: 'Welcome to CognivexaAI: Sample Project',
      category: 'Onboarding',
      description: 'This project was created automatically to help you explore the platform.',
      client: organizationId,
      status: 'planning',
      healthScore: 100,
      progress: 0
    });

    // 2. Set Onboarding Status
    org.onboardingStatus = 'completed';
    org.lifecycleStage = 'active';
    await org.save();

    return {
      message: 'Workspace initialized successfully',
      sampleProjectId: sampleProject._id
    };
  }
};

export default onboardingService;
