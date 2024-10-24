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

const editPost = async (req, res) => {
  const { postId, postTitle, postText } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        postTitle: postTitle,
        postText: postText,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Error updating post" });
  }
};

const deletePost = async (req, res) => {
  const { post } = req.params;

  try {
    await prisma.comment.deleteMany({
      where: {
        id: parseInt(post),
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
    console.error("Error deleting post or comments:", error);
    return res.status(500).json({ message: "Error deleting post or comments" });
  }
};

const changePublishedStatue = async (req, res) => {
  const { postId } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
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
  const { comment } = req.body;
  const { post } = req.params;

  if (!comment) {
    return res.status(400).json({ message: "Comment is required." });
  }

  try {
    const userComment = await prisma.comment.create({
      data: {
        comment: comment,
        authorId: parseInt(post),
      },
    });

    res.status(201).json({
      message: "Comment created successfully",
      comment: userComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editComment = async (req, res) => {
  const { userComment, commentId } = req.body;

  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
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
  const { post } = req.params;
  const { commentId } = req.body;

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
  createPost,
  editPost,
  deletePost,
  changePublishedStatue,
  createComment,
  editComment,
  deleteComment,
};
