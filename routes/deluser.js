const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const { User } = require("../models/User");
const router = require("express").Router();

// Définit la route DELETE pour supprimer un utilisateur par son nom d'utilisateur
router.delete("/:username",verifyTokenAndAuthorization, async (req, res) => {
  const username = req.params.username;

  try {
    // Cherche et supprime l'utilisateur correspondant au nom d'utilisateur spécifié
    const deletedUser = await User.findOneAndRemove({ username: username });

    if (deletedUser) {
      res.status(200).send("Vos données ont bien été supprimées");
    } else {
      res.status(404).send("Erreur : utilisateur non trouvé");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router;
