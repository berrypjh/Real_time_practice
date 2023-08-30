const express = require("express");

const router = express.Router();

//------------------------------------------------
//               /api/user
//------------------------------------------------
router.get("/", async (req, res) => {
  try {
    res.json("Hello");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
