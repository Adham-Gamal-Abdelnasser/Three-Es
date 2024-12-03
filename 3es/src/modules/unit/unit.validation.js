import Joi from "joi";

export const addUnitSchema = Joi.object({
  unitName: Joi.string().min(3).max(20).required(),
  floorNum: Joi.number().min(0).required(),
 
  client: Joi.string().hex().length(24).required(),
});
export const getByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateUnitSchema = Joi.object({
  id: Joi.string().hex().length(24),
  unitName: Joi.string().min(3).max(20),
  floorNum: Joi.number().min(0),
  roomName: Joi.string().min(3).max(20),
  client: Joi.string().hex().length(24),
});
