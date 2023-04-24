const express = require("express");
const router = express.Router();
const {User, Score} = require("../models/User");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).populate("scores");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const scores = user.scores;
    return res.json(scores);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
router.post("/:userId/scores", async (req, res) => {
  try {
    const { userId } = req.params;
    const { category, value } = req.body;
    console.log(userId)
    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérifier si un score existe déjà pour cette catégorie
    let existingScore = user.scores.find((score) => score.category === category);
    if (existingScore) {  //S'il existe alors il modifient la valeur 
      existingScore.value = value;
    } else {
      // Créer un nouveau score
      const score = new Score({ category, value });

      // Ajouter le score à l'utilisateur et sauvegarder
      user.scores.push(score);
    }
    await user.save();

    return res.status(201).json({ message: "Score saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;