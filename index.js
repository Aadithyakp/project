//Modules
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressSession = require("express-session");
const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.MONGO_URI;

//Controllers
const dashboardRouteController = require("./controllers/dashboardRoute");
const g2RouteController = require("./controllers/g2Route");
const gRouteController = require("./controllers/gRoute");
const loginRouteController = require("./controllers/loginRoute");
const signupRouteController = require("./controllers/signupRoute");
const loginFormController = require("./controllers/loginForm");
const gFormController = require("./controllers/gForm");
const g2FormController = require("./controllers/g2Form");
const signupFormController = require("./controllers/signupForm");
const logoutController = require("./controllers/logout");
const appointmentController = require("./controllers/appointmentRoute");
const appointmentFormController = require("./controllers/appointmentForm");
const examinerController = require("./controllers/examinerRoute");
const getSingleUserController = require("./controllers/getSingleUser");
const commentFormController = require("./controllers/commentForm");
const appointmentsController = require("./controllers/appointments");
//Middlewares
const authMiddleware = require("./middleware/authMiddleware");
const ifAuthRedirect = require("./middleware/ifAuthRedirect");
const adminMiddleware = require("./middleware/adminMiddleware");
const examinerMiddleware = require("./middleware/examinerMiddleware");



try {
  const connection = mongoose.connect(uri);
  console.log("MongoDb Connected!!");
} catch (err) {
  console.error("MongoDb Erroorrr!!" + err);
}

//Global Variable
global.loggedIn = null;
// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "secretkey",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userInfo;
  next();
});


//Signup user
app.post("/userSignup", signupFormController);
//Login user
app.post("/userLogin", loginFormController);
//Update G
app.post("/gUpdate", authMiddleware, gFormController);
//Save G2 Details
app.post("/g2Save", authMiddleware, g2FormController);
//Create Appointment
app.post("/appointment", appointmentFormController);

app.post("/addComment", commentFormController);
//Logout User
app.get("/logout", logoutController);



//Dashboard route
app.get("/", dashboardRouteController);
//G2 Portal route
app.get("/g2", authMiddleware, g2RouteController);
//G Portal route
app.get("/g", authMiddleware, gRouteController);
//Login route
app.get("/login", ifAuthRedirect, loginRouteController);
//Signup Portal route
app.get("/signup", ifAuthRedirect, signupRouteController);
//Appoinment Route
app.get("/appointment", adminMiddleware, appointmentController);
//Examiner Route
app.get("/examiner", examinerMiddleware, examinerController);
//Get Single User Data
app.get("/getSingleUser", examinerController);
//Get all appointments
app.get("/appointments", appointmentsController);


app.listen(4200, () => {
  console.log(`App link: http://localhost:4200`);
});
