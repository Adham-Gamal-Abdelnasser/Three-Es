import Joi from "joi";

export const addClientSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(30).required(),
  mobileNumber: Joi.string().min(3).max(20).required(),
});
export const getByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateClientSchema = Joi.object({
  id: Joi.string().hex().length(24),
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  mobileNumber: Joi.string().min(3).max(20),
});
