const express = require("express");
const User = require("../models/User")
const passport = require('passport');

const userController = require("../Controllers/userController");
const { use } = require("passport");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", userController.loginUser);


router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", userController.logout);


router.post("/register", userController.createUser);

module.exports = router;
