const express = require('express');
const router = express.Router();
const userService = require('../Services/rechecheService');

router.get('/recherche', (req, res) => {
    const { nom, prenom } = req.query;
    userService.searchUsers(nom, prenom, (error, result) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête:', error);
            return res.status(500).json({ error: 'Erreur du serveur' });
        }
        res.json(result);
    });
});

module.exports = router;
