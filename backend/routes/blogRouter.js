const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");

router.get("/post", blogController.getAllPosts);
router.get("/post/:postId", blogController.getPost);
router.get("/blog/:postId", blogController.getAllPostComments);
router.post("/post/new", verifyToken, blogController.createPost);
router.patch(
  "/blog/post/:post",
  verifyToken,
  blogController.changePublishedStatue
);
router.delete("/blog/post/:post", verifyToken, blogController.deletePost);
router.post(
  "/blog/:userId/:postId/comment",
  verifyToken,
  blogController.createComment
);
router.put("/blog/:commentId/comment", verifyToken, blogController.editComment);
router.delete(
  "/blog/post/comment/:commentId",
  verifyToken,
  blogController.deleteComment
);

module.exports = router;
