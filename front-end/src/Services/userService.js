import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL;

const Connection = (user) => {
    return axios.post(`${apiUrl}/user`, user, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const ForgetPasswordSend = (user) => {
    return axios.post(`${apiUrl}/user/forget`, user, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const FirstConnection = (email) => {
    return axios.get(`${apiUrl}/user`, email, {  // Utilisation correcte de la méthode GET avec email comme query parameter
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

 const ChangePassword = (modifyPassword) => {
    return axios.post(`${apiUrl}/user/change-password`, modifyPassword, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
 const ForgetPassword = (forgetpassword) => {
    return axios.post(`${apiUrl}/user/forget-password`, forgetpassword, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const Login = (connectionMDP) => {
    return axios.post(`${apiUrl}/user/login`, connectionMDP, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};


const ModifyPassword = (forgetpassword) => {
    return axios.post(`${apiUrl}/user/modify-password`, forgetpassword, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}


export default {
    Connection,
    FirstConnection,
    ChangePassword,
    Login,
    ModifyPassword,
    ForgetPasswordSend,
    ForgetPassword
}