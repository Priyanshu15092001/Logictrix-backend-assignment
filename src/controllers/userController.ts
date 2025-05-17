import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const User = require('../models/User')
const { generateToken } = require('../utils/jwt')

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Send response
    res.status(201).json({
      message:"User registered succesfully",
      token,
    });
  } catch (error: unknown) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports={registerUser}