const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/auth", userController.signIn);

router.post("/auth/logout", userController.logOut);

module.exports = router;
