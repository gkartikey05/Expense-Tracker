import User from "../model/user.model.js";
import AppError from "../utils/error.util.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true,
};

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if ((!fullName, !email, !password)) {
      return next(new AppError("All fields are required", 400));
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new AppError("Email already exist", 400));
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    if (!user) {
      return next(new AppError("User registration failed", 400));
    }

    await user.save();
    user.password = undefined;

    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.comparePassword(password)) {
      return next(new AppError("Email or Password does not match", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
      user,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch {
    return next(new AppError("Failed to get user profile", 500));
  }
};

export const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    httpOnly: true,
    maxAge: 0,
  });

  res.status(200).json({
    success: true,
    message: "User Logged out Successfully",
  });
};
