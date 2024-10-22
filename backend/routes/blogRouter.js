const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.post("/blog/post", blogController.createPost);
router.post("/blog/post/comment", blogController.createComment);

module.exports = router;
