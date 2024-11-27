const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

// affichage des comics
router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.MARVEL_URI}/comics?apiKey=${process.env.API_KEY_MARVEL}`
    );

    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// affichage des comics contenant un personnage spécifique
router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `${process.env.MARVEL_URI}/comics/${characterId}?apiKey=${process.env.API_KEY_MARVEL}`
    );

    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// affichage des informations concernant un comic
router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;

    const response = await axios.get(
      `${process.env.MARVEL_URI}/comic/${comicId}?apiKey=${process.env.API_KEY_MARVEL}`
    );

    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
