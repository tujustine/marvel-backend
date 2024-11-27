const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

// affichage des personnages
router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.MARVEL_URI}/characters?apiKey=${process.env.API_KEY_MARVEL}`
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// affichage des informations sur un personnage
router.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `${process.env.MARVEL_URI}/character/${characterId}?apiKey=${process.env.API_KEY_MARVEL}`
    );

    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
