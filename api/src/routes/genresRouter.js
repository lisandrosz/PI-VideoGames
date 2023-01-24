const express = require("express");
const router = express.Router();
const { cargaDB, consultaDB } = require("../controllers/controllers");
let firstCall = true;

// GET /genres

router.get("/", async (req, res) => {
  let response;
  try {
    if (firstCall) {
      response = await cargaDB();
      firstCall = false;
    } else {
      response = await consultaDB();
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
