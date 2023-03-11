const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');

exports.homePage = async function(req, res) {
    if (req.session.user) {
        let user = await User.findById(req.session.user);
        res.render("pages/home", {
            name: user.username,
            isLoggedIn: true
        });
    } else {
        res.redirect("/login");
    }
    
}

exports.loginPage = function(req,res,next){
   try {
      if(req.session.user){
         res.redirect("/logout");
     }else{
 
         res.render("pages/login",{
             "error":"",
             "isLoggedIn": false
         });
     }
   } catch (error) {
       next(error)
   }
}

exports.processLogin = async function(req,res,next){
    
   try {
     let email = req.body.email;
     let password = req.body.password;
   
     if(email && password){
         let existingUser = await User.findOne({email:email}).select('password');
         if(existingUser){
             let match = await existingUser.isValidate(password);
             if(match){
                 req.session.user = existingUser._id;
                 res.redirect("/");
             }else{
                 res.render("pages/login",{
                     "error":"Invalid password",
                     isLoggedIn: false
                 });
             }
         }else{
             res.render("pages/login",{
                 "error":"User with that email does not exist.",
                 isLoggedIn:false
             });
         }
     }else{
         res.status(400);
         
         res.render("pages/login",{
             "error":"Please fill in all the fields.",
             isLoggedIn:false
         });
     }
   } catch (error) {
    next(error)
    
   }
}

exports.signupPage = function(req,res){
    if(req.session.user){
        res.redirect("/logout");
    } else {
        res.render("pages/signup",{
            "error":"",
            isLoggedIn:false
        });
    }
}

exports.processSignup = async function(req,res,next){
    try {
        let username = req.body.username
        let email = req.body.email;
        let password = req.body.password;
        
        if(username && email && password){
            let existingUser = await User.findOne({email:email});
            if(!existingUser){
                let newUser = new User({
                    username,
                    email,
                    password
                });
                newUser.save();
                res.render('pages/login',{
                    "error":"",
                   isLoggedIn:true 
                })
            }else{
                res.render("pages/signup",{
                    "error":"User with that email already exists.",
                    isLoggedIn:false
                });
            }
        }else{
            res.render("pages/signup",{
                "error":"Please fill in all the fields.",
                isLoggedIn:false
            });
        }
    } catch (error) {
        next(error)
    }
}

exports.logoutPage = function(req,res){
    req.session.destroy();
    res.redirect("/login");    
}