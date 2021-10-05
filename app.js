const express = require("express");
const path = require("path");
const app = express();
const port = 4001;

const { projects } = require("./data.json");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Add static midddleware
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET home page
app.get("/", (req, res, next) => {
  res.render("index", { projects });
});

// GET about page
app.get("/about", (req, res, next) => {
  res.render("about");
});

// GET project page
app.get("/project/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);

  res.render("project", { project });
});

// Port assigment
app.listen(port, () => console.log(`listening on ${port}`));

module.exports = app;
