const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
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
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Successful login
    req.session.userId = user.id;
    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
