const express = require("express");
const passport = require("passport");
const router = express.Router();
const {homePage,loginPage,processLogin,signupPage,processSignup,logoutPage} = require('../controller/userController');
require('../passport')

router.get("/",homePage); 

router.get("/login",loginPage); 

router.post("/login",passport.authenticate('local',{ successReturnToOrRedirect:"/" , failureRedirect:"/login"}),processLogin); 

router.get("/signup",signupPage);

router.post("/signup",processSignup); 

router.get("/logout",logoutPage); 

module.exports = router;