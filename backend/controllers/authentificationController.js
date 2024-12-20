const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.JWT_SECRET || process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  const { username, password, email, userRole } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingEmail) {
      return res.status(400).json({
        message: "Username and Email already exist",
        errors: {
          username: "User already exists",
          email: "Email already exists",
        },
      });
    } else if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
        errors: { username: "User already exists" },
      });
    } else if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
        errors: { email: "Email already exists" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role: userRole,
      },
    });
    console.log("User registered successfully", user);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    jwt.sign(
      { userId: user.id, username: user.username, userRole: user.role },
      process.env.JWT_SECRET || process.env.SECRET_KEY,
      { expiresIn: "604800s" }, //Expire in 1 week
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Could not generate token" });
        }

        res.status(200).json({
          message: "Login successful",
          token,
          user: { username: user.username, email: user.email },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await prisma.$disconnect();
  }
};

const logoutUser = async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      return res.status(200).json({ message: "Logged out successfully" });
    });
  } else {
    return res.status(200).json({ message: "No session found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
