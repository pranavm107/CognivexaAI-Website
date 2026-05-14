import { StatusCodes as httpStatus } from 'http-status-codes';
import * as serviceService from '../services/service.service.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

export const createService = catchAsync(async (req, res) => {
  try {
    console.log('REQ BODY RECEIVED:', JSON.stringify(req.body, null, 2));
    const service = await serviceService.createService(req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('CREATE SERVICE ERROR:', error);
    
    // Handle duplicate slug (MongoError 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists (must be unique)',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack
    });
  }
});

export const getServices = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) {
    filter.active = req.query.active === 'true';
  }
  const services = await serviceService.queryServices(filter, {});
  res.status(httpStatus.OK).json({
    success: true,
    results: services
  });
});

export const getService = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.id);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  res.send(service);
});

export const updateService = catchAsync(async (req, res) => {
  const service = await serviceService.updateServiceById(req.params.id, req.body);
  res.send(service);
});

export const deleteService = catchAsync(async (req, res) => {
  await serviceService.deleteServiceById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
