const express = require("express");
const blogController = require("../controllers/blogController");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || process.env.SECRET_KEY,
    (err, authData) => {
      if (err) {
        console.log("Token verification error:", err);
        return res.status(403).json({ message: "Unauthorized" });
      }

      req.authData = authData;
      next();
    }
  );
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
