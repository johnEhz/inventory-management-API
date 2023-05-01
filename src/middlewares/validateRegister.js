import User from "../models/User";
import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().regex(/^[a-zA-Z0-9 ]{3,50}$/).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$")).required(),
  email: Joi.string().email().required(),
});

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const checkDuplicateUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res
        .status(409)
        .json({ message: "Email registered already exists" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Fatal error" });
  }
};
