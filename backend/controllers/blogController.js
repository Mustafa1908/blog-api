const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { postTitle, postText } = req.body;

  if (!req.session || !req.session.userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        postTitle,
        postText,
        authorId: req.session.userId,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: {
        postTitle: post.postTitle,
        postText: post.postText,
        authorId: post.authorId,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createPost,
};
