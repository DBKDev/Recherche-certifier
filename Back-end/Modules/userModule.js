const express = require('express');
const router = express.Router();
const userService = require('../Services/userService')
const userMailerService = require("./userMailerService.js")
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Le coût du hachage - plus c'est élevé, plus c'est sécurisé

// Fonction pour hacher un mot de passe
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

// Fonction pour générer un mot de passe aléatoire
function generateRandomPassword(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') // Convertir en format hexadécimal
        .slice(0, length); // Tronquer à la longueur souhaitée
}

router.get('/', (req, res) => {
    userService.checkIfFirstConnect().then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
        res.json({ message: 'erreur' })
    })
})

// Vérification de l'adresse mail puis génération du code et envoie par mail
router.post('/', async (req, res) => {
    const { email } = req.body; // Extraire l'email directement de req.body
    console.log('Request body:', req.body);
    // Vérification de la présence de l'email
    if (!email) {
        return res.status(400).json({ message: "L'adresse e-mail est manquante dans la requête" });
    }
    // Vérification du format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Veuillez entrer une adresse mail valide" });
    }
    console.log('Email:', email);
    try {
        // Vérifier si l'adresse e-mail existe déjà dans la base de données
        const emailExist = await userService.checkIfEmailExists(email);
        console.log('Email exists:', emailExist);
        if (!emailExist) {
            return res.status(400).json({ message: "L'adresse e-mail n'existe pas dans la base de données" });
        }
        // Vérifier si c'est la première connexion
        const firstConnect = await userService.checkIfFirstConnect(email);
        console.log('First connect:', firstConnect);
        if (firstConnect) {
            // Générer le mot de passe temporaire
            const temporaryPassword = generateRandomPassword(10);
            // Enregistrer le mot de passe temporaire dans la base de données
            const result = await userService.firstLogin(email, temporaryPassword);
            console.log('First login result:', result);
            // Envoyer l'e-mail de mot de passe temporaire à l'utilisateur
            await userMailerService.sendTemporaryPassword(email, temporaryPassword);

            // Répondre avec le résultat de la première connexion
            return res.status(200).json(result);
        } else {
            // Répondre avec une indication que l'utilisateur n'est pas en première connexion
            return res.status(200).json({ message: "L'utilisateur n'est pas en première connexion", firstConnect: false });
        }
    } catch (error) {
        console.error("Erreur lors de l'inscription de l'utilisateur :", error);
        return res.status(500).json({ message: "Une erreur serveur est survenue lors de l'inscription de l'utilisateur." });
    }
});

//! Génération du Code Mdp oublié
router.post('/forget', async (req, res) => {
    const { email } = req.body; // Extraire l'email directement de req.body
    console.log('Request body:', req.body);
    // Vérification de la présence de l'email
    if (!email) {
        return res.status(400).json({ message: "L'adresse e-mail est manquante dans la requête" });
    }
    // Vérification du format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Veuillez entrer une adresse mail valide" });
    }
    console.log('Email:', email);
    try {
        // Vérifier si l'adresse e-mail existe déjà dans la base de données
        const emailExist = await userService.checkIfEmailExists(email);
        console.log('Email exists:', emailExist);
        if (!emailExist) {
            return res.status(400).json({ message: "L'adresse e-mail n'existe pas dans la base de données" });
        }
      
            const temporaryPassword = generateRandomPassword(10);           
            const result = await userService.firstLogin(email, temporaryPassword);
            await userMailerService.sendTemporaryPassword(email, temporaryPassword);
            return res.status(200).json(result);
        
    } catch (error) {
        console.error("Erreur lors de l'inscription de l'utilisateur :", error);
        return res.status(500).json({ message: "Une erreur serveur est survenue lors de l'inscription de l'utilisateur." });
    }
});



// ! Création du premier mot de passe
router.post('/change-password', async (req, res) => {
    const { code, newPassword, email } = req.body;

    try {
        // Vérifier si le code temporaire est correct pour l'email fourni
        const isCodeValid = await userService.checkTemporaryCode(email, code);

        if (!isCodeValid) {
            return res.status(400).json({ message: "Le code temporaire n'est pas valide." });
        }

        // Hasher le nouveau mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Utilisation de 10 rounds pour le hachage, ajustez selon vos besoins

        // Mettre à jour le mot de passe dans la base de données
        const result = await userService.changeUserPassword(email, hashedPassword);

        return res.status(200).json({ message: "Mot de passe changé avec succès." });
    } catch (error) {
        console.error("Erreur lors du changement de mot de passe :", error);
        return res.status(500).json({ message: "Une erreur est survenue lors du changement de mot de passe." });
    }
});

//! Modification de mot de passe lors d'oublie
router.post('/forget-password', async (req, res) => {
    const { code, newPassword, email } = req.body;
console.log("debug ->",req.body);
    try {
        // Vérifier si le code temporaire est correct pour l'email fourni
        const isCodeValid = await userService.checkTemporaryCode(email, code);

        if (!isCodeValid) {
            return res.status(400).json({ message: "Le code temporaire n'est pas valide." });
        }

        // Hasher le nouveau mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Utilisation de 10 rounds pour le hachage, ajustez selon vos besoins

        // Mettre à jour le mot de passe dans la base de données
        const result = await userService.ForgetPassword(email, hashedPassword);

        return res.status(200).json({ message: "Mot de passe changé avec succès." });
    } catch (error) {
        console.error("Erreur lors du changement de mot de passe :", error);
        return res.status(500).json({ message: "Une erreur est survenue lors du changement de mot de passe." });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        // Récupérer Le mot de passe hasher dans la BDD
        const user = await userService.FetchUser(email);
        console.log("MDP HASHER BDD :", user);

        if (!user) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Comparer le mot de passe reçu avec le mot de passe haché stocké dans la base de données
        const isPasswordValid = await bcrypt.compare(password, user.user_Password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Adresse email ou mot de passe incorrect' });
        }

        // Si tout est correct, retourner une réponse de succès avec les informations de l'utilisateur
        return res.status(200).json({ message: 'Connexion réussie', user: { email: user.user_Email, name: user.name } });

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return res.status(500).json({ message: "Une erreur est survenue lors de la connexion." });
    }
});




module.exports = router