const nodemailer = require('nodemailer');
const userModule = require('../Modules/userModule');
const dotenv = require('dotenv');

dotenv.config();

// Créer un transporteur SMTP réutilisable
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // false pour utiliser STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        ciphers: 'SSLv3'
    }
});


// Fonction pour envoyer un e-mail contenant un mot de passe provisoire
async function sendTemporaryPassword(userEmail, temporaryPassword) {
    const mailOptions = {
        from: `"Code Asquapro" <${process.env.SMTP_USER}>`,
        to: userEmail,
        subject: 'Mot de passe provisoire',
        html: `
    <!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="fr">
    
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
    </head>
    <body style="background-color:#fff;color:#212121">
        <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Asquapro Code de Vérification</div>
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="max-width:37.5em;padding:20px;margin:0 auto;background-color:#eee">
            <tbody>
                <tr style="width:100%">
                    <td>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
                            style="background-color:#fff">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0"
                                            role="presentation"
                                            style="background-color:#252f3d;display:flex;padding:20px 0;align-items:center;justify-content:center">
                                            <tbody>
                                                <tr>
                                                    <td><img alt="Asquapro logo" height="45"
                                                            src="https://images.squarespace-cdn.com/content/v1/5f58e5ea7330e002f0a9e2f6/1599662566542-PL33D7WH2UZFO8I90WKK/Logo+ROUGE.png?format=500w"
                                                            style="display:block;outline:none;border:none;text-decoration:none"
                                                            width="100" /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0"
                                            role="presentation" style="padding:25px 35px">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h1
                                                            style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:20px;font-weight:bold;margin-bottom:15px">
                                                            Vous avez demandé à réinitialiser ou à créer un nouveau mot de
                                                            passe</h1>
                                                        <p
                                                            style="font-size:14px;line-height:24px;margin:24px 0;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-bottom:14px">
                                                            Veuillez utiliser ce code pour accéder à la page de création de
                                                            mot de passe. Assurez-vous de le garder en sécurité et de ne pas
                                                            le partager avec d&#x27;autres personnes.</p>
                                                        <table align="center" width="100%" border="0" cellPadding="0"
                                                            cellSpacing="0" role="presentation"
                                                            style="display:flex;align-items:center;justify-content:center">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p
                                                                            style="font-size:14px;line-height:24px;margin:0;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-weight:bold;text-align:center">
                                                                            Voici votre code temporaire :</p>
                                                                        <p
                                                                            style="font-size:36px;line-height:24px;margin:10px 0;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-weight:bold;text-align:center">
                                                                            ${temporaryPassword}</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />
                                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0"
                                            role="presentation" style="padding:25px 35px">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p
                                                            style="font-size:14px;line-height:24px;margin:0px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
                                                            Si vous n&#x27;avez pas demandé cette réinitialisation, veuillez
                                                            ignorer cet email ou contacter notre équipe de support.</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
    
    </html>
        `
    };


    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé: ' + info.response);
        return info;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        throw error;
    }
}



module.exports = {
    sendTemporaryPassword
};