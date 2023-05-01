import Joi from "joi";

const brandCreationSchema = Joi.object({
  name: Joi.string().required().min(2)
});

export const validateBrandCreation = (req, res, next) => {
  const { error } = brandCreationSchema.validate(req.body);
  if (error) {
    return res.status(403).json({ message: error.details[0].message });
  }
  next();
};
