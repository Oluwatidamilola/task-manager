// validation/taskSchema.js
import Joi from 'joi';

export const taskSchema = Joi.object({
  title: Joi.string().max(255).required(), // Title is required and must be a string (max length 255)
  user_id: Joi.number().integer().required(), // user_id is required and must be an integer
  description: Joi.string().allow(null, '').optional(), // description is optional, defaults to null or an empty string
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed') // status must be one of these values
    .default('pending'),
  due_date: Joi.date().iso().allow(null).optional(), // due_date is optional and must be a valid ISO date or null
});
