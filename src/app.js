require("dotenv").config();
const express = require("express");
const ConnectDataBase = require("./conn/connection");
const logger = require('morgan')
const session = require('express-session')
const mongoStore = require('connect-mongo');
const router = require("./routes");




const app = express();
const port = parseInt(process.env.PORT || 9000);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(logger('dev'));
app.set('views','src/view')
app.set('view engine','ejs')

const store = new mongoStore({mongoUrl :process.env.db_url})
const oneDay = 1000 * 60 * 60 * 24


app.use(session({
    key:"user_sid",
    secret:"Tarun@123",
    resave:false,
    saveUninitialized:false,
    cookie :{
        maxAge:oneDay
    },
    store:store
}))


app.use(router)



ConnectDataBase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running and up at ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
