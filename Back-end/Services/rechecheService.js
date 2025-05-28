const db = require('./database');

const searchUsers = (nom, prenom, callback) => {
    let query = 'SELECT nom, prenom, date_obtention, qualification, date_valide FROM utilisateurs_centralisee WHERE nom = ? AND prenom = ?';
    let params = [nom, prenom];

    db.query(query, params, (error, results) => {
        if (error) {
            return callback(error);
        }
        if (results.length > 0) {
            callback(null, { found: true, data: results });
        } else {
            callback(null, { found: false, message: 'Utilisateur introuvable' });
        }
    });
};

module.exports = {
    searchUsers
};
