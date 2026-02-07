import { generateToken } from "../lib/utils.js";
import User from "../middleware/user.model.js"
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if(!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are requried" });
    }
    // 1. Password validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // 5. Save user
    await newUser.save();

    // 6. Generate JWT token
    generateToken(newUser._id, res);

    // 7. Send response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.log("Error in signUp controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logIn = (req, res) => {};

export const logout = (req, res) => {};
