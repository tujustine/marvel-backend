const isAuthenticated = require("../middlewares/isAuthenticated");
const express = require("express");
const Favorite = require("../models/Favorite");
require("dotenv").config();
const router = express.Router();

// ajouter ou supprimer des favoris
router.post("/favorite", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const { comicOrCharacter, type } = req.body;

    const existingFavorite = await Favorite.findOne({
      user: userId,
      "comicOrCharacter._id": comicOrCharacter._id,
    });

    // Si le favori n'existe pas, on le crée
    if (!existingFavorite) {
      const newFavorite = new Favorite({
        user: userId,
        comicOrCharacter: comicOrCharacter,
        type: type,
      });
      await newFavorite.save();
      return res
        .status(201)
        .json({ message: "favorite added", favorite: newFavorite });
    } else {
      // Si le favori existe déjà, on le supprime
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({ message: "favorite deleted" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// afficher les favoris
router.get("/favorite", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const userFavorites = await Favorite.find({ user: userId });
    const count = await userFavorites.countDocuments(userId);
    const result = { count: count, favorites: userFavorites };

    if (userFavorites.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No favorite for this user" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
