const express = require("express");
const router = express.Router();

const { projects } = require("../data.json");

// GET project page
router.get("/:id", (req, res, next) => {
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
    err.message = "Not Found. Looks like this page does not exist";
    const errorMessage = err.message;
    const code = res.statusCode;
    res.render("page-not-found", { errorMessage, code });
    console.log(`Error ${code} - ${errorMessage}`);
  }
});

module.exports = router;
