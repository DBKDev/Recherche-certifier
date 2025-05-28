const conn = require('./database')
const dotenv = require('dotenv');
const mysql = require('mysql');


dotenv.config()

const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
});

//! Vérification de l'existence de l'adresse email
const checkIfEmailExists = (email) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) AS count FROM userconnection WHERE user_Email = ?`
        conn.query(sql, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                const count = result[0].count; // assigne la valeur extraite de la propriété count de la première ligne de la requête SQL
                resolve(count > 0); // Renvoie true si l'adresse email existe déjà, sinon false
            }
        });
    });
};

//! Vérification de la première connexion
const checkIfFirstConnect = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT firstconnect FROM userconnection WHERE user_email = ?`;
        conn.query(sql, [email], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length === 0) {
                // Aucun utilisateur trouvé avec cet email
                resolve(false);
            } else {
                // Utilisateur trouvé, vérifier le statut de connexion
                const firstConnect = result[0].firstconnect; // Assurez-vous que le nom de la colonne est correct
                resolve(firstConnect); // Renvoie la valeur de firstconnect (1 ou 0)
            }
        });
    });
};


const firstLogin = (userEmail, password) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE userconnection SET temp_mdp = ? WHERE user_Email = ?`;
        conn.query(sql, [password, userEmail], (error, result) => {
            if (error) {
                console.error('Erreur lors de la mise à jour du mot de passe :', error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

const FetchUser = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT user_Password FROM userconnection WHERE user_Email = ?`;
        conn.query(sql, [email], (err, result, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]); // On récupère le premier résultat (normalement unique)
            }
        });
    });
};




const checkTemporaryCode = (email, code) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM userconnection WHERE user_email = ? AND temp_mdp = ?';
        pool.query(sql, [email, code], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0);
            }
        });
    });
};

// Fonction pour mettre à jour le mot de passe utilisateur dans la base de données
const changeUserPassword = (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE userconnection SET user_Password = ?, firstconnect = 0 WHERE user_email = ?';
        pool.query(sql, [hashedPassword, email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
const ForgetPassword = (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE userconnection SET user_Password = ? WHERE user_email = ?';
        pool.query(sql, [hashedPassword, email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Fonction de connexion
const login = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM userconnection WHERE user_email = ?';
        conn.query(sql, [email], async (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results.length === 0) {
                return reject(new Error('Adresse email ou mot de passe incorrect'));
            }

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.user_Password);
            if (!isPasswordValid) {
                return reject(new Error('Adresse email ou mot de passe incorrect'));
            }

            resolve(user);
        });
    });
};



module.exports = {
    firstLogin,
    checkIfEmailExists,
    checkIfFirstConnect,
    FetchUser,
    changeUserPassword,
    checkTemporaryCode,
    login,
    ForgetPassword
}