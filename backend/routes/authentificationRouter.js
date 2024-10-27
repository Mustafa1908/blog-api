const express = require("express");
const authentificationController = require("../controllers/authentificationController");

const router = express.Router();

router.get("/alluser", authentificationController.getAllUsers);
router.post("/user", authentificationController.registerUser);
router.post("/login", authentificationController.loginUser);
router.post("/logout", authentificationController.logoutUser);
router.get("/check/session", authentificationController.checkSession);

module.exports = router;
