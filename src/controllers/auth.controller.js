import User from "../models/User";
import jwt from "jsonwebtoken";
import Config from "../config";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = User({
      name,
      email,
      password: await User.ecryptPassword(password),
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id, name }, Config.SECRET_KEY, {
      expiresIn: 86400, // 1 dia
    });

    res.status(200).json({ token, name, email });
  } catch (error) {
    return res.status(500).jeons({ message: "Error de registro." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const matchPassword = await User.comparePassword(
      password,
      foundUser.password
    );

    if (!matchPassword) {
      return res.status(401).json({
        token: null,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: foundUser._id, name: foundUser.name },
      Config.SECRET_KEY,
      {
        expiresIn: 86400, //1dia
      }
    );

    res.status(200).json({
      token,
      name: foundUser.name,
      email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error de inicio de sesión." });
  }
};

export const who = async (req, res) => {
  try {
    const { email } = req;

    const foundUser = await User.findOne({
      email,
    });
    if (foundUser) {
      res.status(200).json({
        name: foundUser.name,
        email: foundUser.email,
      });
    } else {
      res.status(400).json({
        message: "Not authenticated",
      });
    }
  } catch (error) {
    res.status(500).json({message: 'Error de autenticación.'})
  }
};
