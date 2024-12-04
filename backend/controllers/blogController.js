const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPost = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPostComments = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!comments.length) {
      return res
        .status(404)
        .json({ message: "No comments found for this post." });
    }

    return res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createPost = async (req, res) => {
  const { postTitle, postText, createdAt } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        postTitle: postTitle,
        postText: postText,
        createdAt: createdAt,
        authorId: req.authData.userId,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: {
        postTitle: post.postTitle,
        postText: post.postText,
        createdAt: post.createdAt,
        authorId: post.authorId,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  const { post } = req.params;

  try {
    await prisma.comment.deleteMany({
      where: {
        postId: parseInt(post),
      },
    });

    const deletedPost = await prisma.post.delete({
      where: {
        id: parseInt(post),
      },
    });

    return res.status(200).json({
      message: "Post and associated comments deleted successfully",
      deletedPost,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Post not found" });
    }

    if (error.code === "P2003") {
      return res.status(400).json({
        message:
          "Cannot delete the post because there are comments or other dependencies.",
      });
    }

    console.error("Error deleting post or comments:", error);
    return res.status(500).json({ message: "Error deleting post or comments" });
  }
};

const changePublishedStatue = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.post),
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(req.params.post),
      },
      data: {
        published: !post.published,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Error updating post" });
  }
};

const createComment = async (req, res) => {
  const { comment, createdAt } = req.body;
  const { postId, userId } = req.params;

  if (!comment) {
    return res.status(400).json({ message: "Comment is required." });
  }

  try {
    const userComment = await prisma.comment.create({
      data: {
        comment: comment,
        createdAt: createdAt,
        postId: parseInt(postId),
        userId: parseInt(userId),
      },
    });

    return res.status(201).json({
      message: "Comment created successfully",
      comment: userComment,
      createdAt: createdAt,
      postId: postId,
      userId: userId,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const editComment = async (req, res) => {
  const { userComment } = req.body;
  const { commentId } = req.params;

  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: parseInt(commentId),
      },
      data: {
        comment: userComment,
      },
    });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Error updating post" });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: parseInt(commentId),
      },
    });

    return res
      .status(200)
      .json({ message: "Comment deleted successfully", deletedComment });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Comment not found" });
    }
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Error deleting comment" });
  }
};

module.exports = {
  getAllPosts,
  getPost,
  getAllPostComments,
  createPost,
  deletePost,
  changePublishedStatue,
  createComment,
  editComment,
  deleteComment,
};
