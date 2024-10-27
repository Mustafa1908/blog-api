const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Use environment variable for secret

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.comment.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await prisma.$disconnect();
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

    // Create a token
    jwt.sign(
      { userId: user.id, username: user.username }, // Include relevant user info
      process.env.JWT_SECRET || "secretkey", // Use environment variable for the secret
      { expiresIn: "604800s" },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Could not generate token" });
        }

        // Send response with the token
        res.status(200).json({
          message: "Login successful",
          token, // Send the token back to the client
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
  // Destroy the user session
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

const checkSession = (req, res) => {
  if (req.session && req.session.userId) {
    return res.status(200).json({ message: "User is logged in" });
  }
  return res.status(401).json({ message: "User is not logged in" });
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  checkSession,
};
