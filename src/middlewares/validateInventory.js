import Joi from "joi";

const inventoryCreationSchema = Joi.object({
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(5)
});

export const validateInventoryCreation = (req, res, next) => {
  const { error } = inventoryCreationSchema.validate(req.body);
  if (error) {
    return res.status(403).json({ message: error.details[0].message });
  }
  next();
};
