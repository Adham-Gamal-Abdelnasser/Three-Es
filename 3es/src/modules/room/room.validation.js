import Joi from 'joi';

const createRoomSchema = Joi.object({
  roomName: Joi.string().required().min(3).max(30).trim(),
  CreatedBy: Joi.string().hex().length(24).required(),
  unitId: Joi.string().hex().length(24).required(),
});

const addRoomItemSchema = Joi.object({
  roomId: Joi.string().hex().length(24).required(),
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).default(1),
  price: Joi.number().required(),
});

const getByUnitIdSchema = Joi.object({
  unitId: Joi.string().hex().length(24).required(),
});

const updateRoomItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().required(),
});

const deleteRoomSchema = Joi.object({
  unitId: Joi.string().hex().length(24).required(),
});


export {
  createRoomSchema,
  addRoomItemSchema,
  getByUnitIdSchema,
  updateRoomItemSchema,
  deleteRoomSchema,
}