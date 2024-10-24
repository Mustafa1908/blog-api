const express = require("express");
const authentificationController = require("../controllers/authentificationController");

const router = express.Router();

router.post("/user", authentificationController.registerUser);
router.post("/log_in", authentificationController.loginUser);

module.exports = router;
