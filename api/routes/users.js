const express = require("express");
const {auth} = require("../helpers/auth");
const router = express.Router();

const userController = require("../controllers/users");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.delete("/", auth,  userController.deleteUser);

module.exports = router;