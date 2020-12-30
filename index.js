const express = require("express");
require("dotenv").config();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport")
const User = require("./models/User");
const flash = require("connect-flash");
require('dotenv').config()



/// import Passport config
require("./config/passport")(passport);

//// import Routers
const blogRouter = require("./Routes/blogRoutes");
const userRouter = require("./Routes/userRoutes");




/////////  Initialise express
const app = express();




////////  //////////////////    Middlewares   //////////////////////////////////
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));




//// Setting up express session
app.use(session({
  secret: 'Please keep it a secret.',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

////// Initiliasing passport
app.use(passport.initialize());
app.use(passport.session());




////// Flash middlewares
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_message = req.flash("success_message")
  res.locals.failure_message = req.flash("failure_message")
  res.locals.error = req.flash("error")
  next();
})



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function (err) {
  if (err) {
    console.log(err)
  }
  else {
    console.log("Successfully connected to database...")
  }
})





/////// Using routes
app.use("/", blogRouter);

app.use("/", userRouter);

app.get("/", (req, res) => {
  res.redirect("/login");
});


app.get("*", (req, res) => {
  res.send("Page doesn't exist");
})



///// Port iniialize
app.listen(process.env.PORT || 3000, () =>
  console.log("Server is up and running....")
);
