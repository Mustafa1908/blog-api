const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const authentificationRouter = require("./routes/authentificationRouter");
const blogRouter = require("./routes/blogRouter");

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cors());
app.use("/", authentificationRouter, blogRouter);

const PORT = 8000;

app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}!`));
