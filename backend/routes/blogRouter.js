const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.post("/blog/create_post", blogController.createPost);

module.exports = router;
