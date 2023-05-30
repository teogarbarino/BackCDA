const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    // Vérifier si le token existe dans l'en-tête de la requête
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        // Vérifier la validité du token
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(403).json("Le token n'est pas valide");
            }
            // Si le token est valide, stocker les informations utilisateur dans req.user
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("Vous n'êtes pas authentifié !");
    }
};

// Middleware pour vérifier le token et l'autorisation d'accès à une ressource
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // Vérifier si l'utilisateur a l'identifiant correspondant ou s'il est un administrateur
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Vous n'êtes pas autorisé !");
        }
    });
};

// Middleware pour vérifier le token et l'autorisation d'accès en tant qu'administrateur
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Vérifier si l'utilisateur est un administrateur
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Vous n'êtes pas autorisé !");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
