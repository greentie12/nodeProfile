const express = require("express");
const path = require("path");
const app = express();
const port = 4001;

// require the projects and skills JSON data
const { projects } = require("./data.json");
const { skills } = require("./skills.json");

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
  res.render("about", { skills });
});

// GET project page
app.get("/project/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  // checks if the project exists in the projects object
  if (project) {
    res.render("project", { projects, id: projectId });
  }
  // error handler if the project id does not exists
  else {
    const err = new Error();
    res.status(404);
    err.message = "Looks like this page does not exist";
    const errorMessage = err.message;
    const code = res.statusCode;
    res.render("page-not-found", { errorMessage, code });
  }
});

// Error Handlers

// 404 handler to catch a non-existent or undefined route
app.use((req, res, next) => {
  const err = new Error();
  res.status(404);
  err.message = "Not Found. Looks like this page does not exist";
  const errorMessage = err.message;
  const code = res.statusCode;
  res.render("page-not-found", { errorMessage, code, err });
});

// Global handler to catch 404 or any other error
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).render("error");
  } else {
    res.status(500);
    err.message =
      "There is a problem with the resource you are looking for and can't currently be displayed.";
    const errorMessage = err.message;
    const code = res.statusCode;
    res.render("error", { code, errorMessage });
  }
});

// Port assigment
app.listen(port, () => console.log(`listening on ${port}`));

module.exports = app;
