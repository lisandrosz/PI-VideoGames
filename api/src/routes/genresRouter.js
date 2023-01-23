const express = require("express");
const router = express.Router();

// GET /genres

router.get("/", (req, res) => {
  res.send("Estas en /genres");
});

module.exports = router;
