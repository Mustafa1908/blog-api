const express = require("express");
const authentificationController = require("../controllers/authentificationController");

const router = express.Router();

router.post("/user", authentificationController.registerUser);
router.post("/log_in", authentificationController.loginUser);
router.get("/users", authentificationController.getAllUsers); // New route for getting all users

module.exports = router;
