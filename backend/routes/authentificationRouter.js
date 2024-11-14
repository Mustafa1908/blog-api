const express = require("express");
const authentificationController = require("../controllers/authentificationController");

const router = express.Router();

router.post("/user", authentificationController.registerUser);
router.post("/login", authentificationController.loginUser);
router.post("/logout", authentificationController.logoutUser);

module.exports = router;
