import Joi from "joi";

const providerCreationSchema = Joi.object({
  name: Joi.string().required().min(2)
});

export const validateProviderCreation = (req, res, next) => {
  const { error } = providerCreationSchema.validate(req.body);
  if (error) {
    return res.status(403).json({ message: error.details[0].message });
  }
  next();
};
