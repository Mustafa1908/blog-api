const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.post("/blog/:post", blogController.createPost);
router.patch("/blog/post", blogController.changePublishedStatue);
router.put("/blog/:post/edit", blogController.editPost);
router.delete("/blog/:post/delete_post", blogController.deletePost);
router.post("/blog/:post/comment", blogController.createComment);
router.put("/blog/:post/edit_comment", blogController.editComment);
router.delete("/blog/:post/delete_comment", blogController.deleteComment);

module.exports = router;
