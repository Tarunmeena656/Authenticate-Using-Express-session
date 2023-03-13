require("dotenv").config();
const express = require("express");
const ConnectDataBase = require("./conn/connection");
const logger = require("morgan");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const router = require("./routes");
const passport = require("passport");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

const redisClient = redis.createClient({ url: 'redis://127.0.0.1:6379'  });
redisClient.connect()
const store = new RedisStore({ client: redisClient })

const app = express();
const port = parseInt(process.env.PORT || 9000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger("dev"));
app.set("views", "src/view");
app.set("view engine", "ejs");

redisClient.on("error", function (err) {
  console.log(" Cannot create a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    store,
    secret: "Tarun@123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: oneDay
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

ConnectDataBase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running and up at ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
