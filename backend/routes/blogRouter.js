const express = require("express");
const blogController = require("../controllers/blogController");
const jwt = require("jsonwebtoken");
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, authData) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    req.authData = authData;
  });
  next();
};

router.get("/post", blogController.getAllPosts);
router.get("/post/:postId", blogController.getPost);
router.get("/blog/:postId", blogController.getAllPostComments);
router.post("/post/new", verifyToken, blogController.createPost);
router.patch(
  "/blog/post/:post",
  verifyToken,
  blogController.changePublishedStatue
);
router.put("/blog/:post/edit", verifyToken, blogController.editPost);
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
