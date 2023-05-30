const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const scoresRoute = require("./routes/score");
const delUser = require("./routes/deluser");

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Se connecter à la base de données MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connexion à la base de données réussie !"))
    .catch((err) => {
        console.log(err);
    });

// Utiliser le middleware pour traiter les requêtes JSON
app.use(express.json());

// Définir les routes pour l'authentification, les scores et la suppression d'utilisateur
app.use("/api/auth", authRoute);
app.use("/api/scores", scoresRoute);
app.use("/api/rm", delUser);

// Démarrer le serveur
app.listen(process.env.PORT || 5000, () => {
    console.log("Le serveur backend est en cours d'exécution !");
});