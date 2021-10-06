const express = require("express");
const router = express.Router();

const { skills } = require("../skills.json");

// GET about page
router.get("/", (req, res, next) => {
  res.render("about", { skills });
});

module.exports = router;
