import Joi from "joi";

export const calculateCartSchema = Joi.object({
  clientId: Joi.string().hex().length(24), // Client ID is required
  profitMargin: Joi.number().min(0),
  taxRate: Joi.number().min(0),
  shippingCost: Joi.number(),
  customsCost: Joi.number(),
  customsClearance: Joi.number(),
  storage: Joi.number(),
  localShipping: Joi.number(),
  otherCosts: Joi.number().optional(),
  setup: Joi.number(),
  transportation: Joi.number(),
  discountRate: Joi.number().min(0).optional(),
  commission: Joi.number().min(0).max(100).optional(), // Allow commission to be between 0% and 100%
  totalItems: Joi.number().min(0), // Total items can be included if needed
  currencyRate: Joi.number().min(0).optional()
});