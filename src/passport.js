const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/userModel");

passport.use('local',
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "Not Found" });
      const isvalid = await user.isValidate(password);
      if (!isvalid) return done(null, false, { message: "Invalid password" });
      return done(null, user);
    }
  )
);


passport.serializeUser(function(user,done){
    done(null,  user.id)
})


passport.deserializeUser(function(id , done){
   const user= User.findById(id)
   done(null , user)
})