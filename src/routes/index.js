const express = require("express");
const router = express.Router();
const {homePage,loginPage,processLogin,signupPage,processSignup,logoutPage} = require('../controller/userController');

router.get("/",homePage); 

router.get("/login",loginPage); 

router.post("/login",processLogin); 

router.get("/signup",signupPage);

router.post("/signup",processSignup); 

router.get("/logout",logoutPage); 

module.exports = router;