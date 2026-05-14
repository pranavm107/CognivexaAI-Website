import Service from '../models/Service.model.js';
import { StatusCodes as httpStatus } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const createService = async (serviceBody) => {
  return Service.create(serviceBody);
};

export const queryServices = async (filter, options) => {
  const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
  return services;
};

export const getServiceById = async (id) => {
  return Service.findById(id);
};

export const updateServiceById = async (serviceId, updateBody) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  Object.assign(service, updateBody);
  await service.save();
  return service;
};

export const deleteServiceById = async (serviceId) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  await service.deleteOne();
  return service;
};
