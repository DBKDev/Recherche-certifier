import React, { useState } from 'react';
import "../Styles/Recherche.css";
import RechercheService from "../Services/RechercheServices";
import { format, isAfter } from 'date-fns';

const Recherche = () => {
    const [currentRecherche, setCurrentRecherche] = useState({
        Nom: "",
        Prenom: "",
    });
    const [result, setResult] = useState(null); // État pour stocker les résultats de la recherche
    const [error, setError] = useState(null);   // État pour gérer les erreurs de recherche

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setCurrentRecherche({ ...currentRecherche, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêcher la soumission par défaut du formulaire
        try {
            const response = await RechercheService.searchUser(currentRecherche.Nom, currentRecherche.Prenom);
            console.log(response.data); // Vérifie ce que retourne response.data
            if (response.data.found) {
                setResult(response.data.data); // Met à jour result avec les données de réponse (response.data.data)
                setError(null); // Réinitialise l'état d'erreur
            } else {
                setResult([]); // Aucun utilisateur trouvé, initialise result comme un tableau vide
                setError("Cet opérateur n’est pas connu par l’ASQUAPRO.");
            }
        } catch (err) {
            setError("Erreur lors de la recherche"); // Gère les erreurs
            setResult(null); // Réinitialise result en cas d'erreur
        }
    };

    const renderDateIcon = (dateValide) => {
        const currentDate = new Date();
        const isValid = isAfter(new Date(dateValide), currentDate); // Vérifie si dateValide est postérieure à la date actuelle

        if (isValid) {
            return <i className='bx bx-check-circle'></i>; // Affiche l'icône de coche si la date est valide
        } else {
            return <i className='bx bx-x-circle'></i>; // Affiche l'icône de croix si la date est invalide
        }
    };

    return (
        <div className="page-width">
            <div className="content">
                <form className='formulaire-recherche'>
                    <p>
                        Vous souhaitez vérifier un certificat ASQUAPRO. Entrez le nom et prénom de l’opérateur concerné :
                    </p>
                    <div className='formulaire-nom'>
                        <label htmlFor="Nom">Nom</label>
                        <input type="text" name="Nom" placeholder='Renseignez le nom' value={currentRecherche.Nom} onChange={handleChange} required />
                    </div>
                    <div className='formulaire-prenom'>
                        <label htmlFor="Prenom">Prénom</label>
                        <input type="text" name="Prenom" placeholder='Renseignez le prénom' value={currentRecherche.Prenom} onChange={handleChange} required />
                    </div>
                </form>
                <button type="submit" className='formulaire-bouton' onClick={handleSubmit}>Rechercher</button>
            </div>
            {result !== undefined && (
                result !== null && (
                    result.length > 0 ? (
                        <div className='partie-recherche'>
                            <h2>Résultats de la recherche :</h2>
                            <ul>
                                {result.map((user, index) => (
                                    <li key={index} className='resultat-recherche'>
                                        {user.nom} {user.prenom} - {user.qualification} - {user.designation} - Expiration : {format(new Date(user.date_valide), 'dd/MM/yyyy')} {' '}
                                        <div>
                                            {renderDateIcon(user.date_valide)}
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className='partie-recherche'>
                            <h2>Résultats de la recherche :</h2>
                            <ul>
                                <p>{error}</p>
                            </ul>
                        </div>
                    )
                )
            )}
        </div>
    );
}

export default Recherche;
