const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.model');
const { ForbiddenError } = require("@casl/ability");
const {defineAbilities}=require('../utils/abilities')

// Middleware pour vérifier le token JWT
exports.verifyToken = async (req, res, next) => {
    try {
        const tokenBearer = req.headers['authorization'] || req.body.token || req.headers['access'];

        if (!tokenBearer) {
            return res.status(401).json({ error: "Token missing" });
        }

        const token = tokenBearer.startsWith('Bearer ') ? tokenBearer.replace('Bearer ', '') : tokenBearer;

        if (!token) {
            return res.status(401).json({ error: "Invalid token format" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded._id; // Ajout de l'ID de l'utilisateur au `req`

        next(); // Passage au middleware suivant
    } catch (err) {
        console.error("JWT verification error:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

exports.checkAbility = (action, subject) => {
    return async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.user_id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const ability = defineAbilities(user);
            ForbiddenError.from(ability).throwUnlessCan(action, subject);

            next();
        } catch (error) {
            console.error("Access control error:", error.message);
            res.status(403).json({ message: 'Access Denied!', error: error.message });
        }
    };
};
