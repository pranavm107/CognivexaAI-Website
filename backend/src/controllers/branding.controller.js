import { StatusCodes } from 'http-status-codes';
import Client from '../models/Client.model.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

/**
 * BRANDING & WHITE-LABEL CONTROLLER
 */
export const getBrandingSettings = catchAsync(async (req, res) => {
  const organization = await Client.findById(req.user.clientId);
  if (!organization) throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found');
  
  res.send({ success: true, data: organization.branding });
});

export const updateBrandingSettings = catchAsync(async (req, res) => {
  const organization = await Client.findById(req.user.clientId);
  if (!organization) throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found');

  organization.branding = {
    ...organization.branding,
    ...req.body
  };

  await organization.save();
  res.send({ success: true, data: organization.branding });
});

export default {
  getBrandingSettings,
  updateBrandingSettings
};
