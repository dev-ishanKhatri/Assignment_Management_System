import User from "../Schemas/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mysecretkey";

export const reg = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, Password, confirmPass, role } = req.body;

    // Validation
    if (!name || !email || !Password || !confirmPass) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (Password !== confirmPass) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      name,
      email,
      Password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const login = async (req, res) => {

  try {

    const { email, Password } = req.body;

    if (!email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      SECRET_KEY,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      role: user.role,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};