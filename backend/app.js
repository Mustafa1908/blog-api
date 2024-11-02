const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const authentificationRouter = require("./routes/authentificationRouter");
const blogRouter = require("./routes/blogRouter");

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cors());

app.use("/", authentificationRouter, blogRouter);

const PORT = 8000;

app.listen(PORT, () =>
  console.log(`My first Express app - listening on port ${PORT}!`)
);
