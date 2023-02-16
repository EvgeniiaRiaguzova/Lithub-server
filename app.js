// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");


//import the isAuthenticated middleware and use it to protect protected routes:
const { isAuthenticated } = require("./middleware/jwt.middleware")


// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const bookRouter = require("./routes/book.routes");
app.use("/api/books",  bookRouter);

const authRouter = require("./routes/auth.routes");          

app.use("/api/auth", authRouter);  

const userRouter = require("./routes/user.routes");          
app.use("/api/users", userRouter); 

const commentRouter = require("./routes/comment.routes");
app.use("/api/comments", isAuthenticated, commentRouter);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
