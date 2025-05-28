import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function searchUser(nom, prenom) {
    return axios.get(`${apiUrl}/recherche?nom=${nom}&prenom=${prenom}`);
}

export default {
    searchUser,
}
