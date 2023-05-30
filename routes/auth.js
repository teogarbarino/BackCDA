const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {User, Score} = require("../models/User");


router.post("/register",async(req,res)=>{
   // Création des scores pour les catégories "math", "anglais" et "francais"
   const scoreMath = new Score({
    category: "math",
    value: [0,0,0,0,0,0,0,0,0,0]
});
const scoreAnglais = new Score({
    category: "anglais",
    value: [0,0,0,0,0,0,0,0,0,0]
});
const scoreFrancais = new Score({
    category: "francais",
    value: [0,0,0,0,0,0,0,0,0,0]
});

// Création d'un nouvel utilisateur avec les données fournies dans la requête
const newUser = new User({
    username: req.body.username,
    classe: req.body.classe,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    scores: [scoreMath, scoreAnglais, scoreFrancais]
});

try {
    // Sauvegarde du nouvel utilisateur dans la base de données
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
} catch(err) {
    res.status(500).json(err);
}

});

//
router.post("/login", async (req, res) => {
    try {
      // Recherche de l'utilisateur correspondant à l'adresse e-mail fournie dans la requête
      const user = await User.findOne({ email: req.body.username });

      // Vérification des informations d'identification
      if (!user) {
          return res.status(401).json("Wrong credentials");
      }
      const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
      );
      const Oripassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (Oripassword !== req.body.password) {
          return res.status(401).json("Wrong credentials!");
      }

      // Génération d'un jeton d'accès JWT pour l'utilisateur authentifié

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;