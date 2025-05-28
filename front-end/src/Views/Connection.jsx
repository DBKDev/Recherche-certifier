import React, { useState } from 'react';
import userService from '../Services/userService';
import FirstForm from '../Components/FirstForm';
import CreationForm from '../Components/Creation';
import LoginForm from '../Components/Login';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Form.css'

const Connection = ({ setLoggedIn }) => {
    const [connect, setConnect] = useState({ email: '' });
    const [formType, setFormType] = useState('initial');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const navigate = useNavigate();

    const [modifyPassword, setModifyPassword] = useState({
        code: '',
        newPassword: '',
        newPasswordVerify: '',
        email: ''
    });

    const [forgetpassword, setForgetpassword] = useState({
        code: '',
        newPassword: '',
        newPasswordVerify: '',
        email: ''
    });

    const [connectionMDP, setConnectionMDP] = useState({
        email: '',
        password: ''
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Utilisation de l'état local ici

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setConnect({ ...connect, [name]: value });
        setModifyPassword({ ...modifyPassword, email: value });
        setConnectionMDP({ ...connectionMDP, [name]: value });
        setForgetpassword({ ...forgetpassword, [name]: value });
    };

    const handleChangeBis = (e) => {
        const { name, value } = e.currentTarget;
        setModifyPassword({ ...modifyPassword, [name]: value });
    };

    const HandleChangeForget = (e) => {
        const { name, value } = e.currentTarget;
        setForgetpassword({ ...forgetpassword, [name]: value });
    };

    const handleChangelogin = (e) => {
        const { name, value } = e.currentTarget;
        setConnectionMDP({ ...connectionMDP, [name]: value });
    };

    const loginpassword = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.Login(connectionMDP);
            if (response.status === 200) {
                toast.success('Connexion Réussie');
                setIsLoggedIn(true); // Met à jour l'état local de connexion
                setLoggedIn(true); // Met à jour l'état de connexion dans App
                navigate('/Recherche');
            }
        } catch (error) {
            toast.error('Erreur lors de la connexion: ' + error.response.data.message);
        }
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.Connection(connect);
            if (response.data.firstConnect === false) {
                setIsForgotPassword(isForgotPassword);
                setFormType('loginConnect');
            } else {
                setFormType('createConnect');
            }
        } catch (error) {
            toast.error('Erreur lors de la connexion: ' + error.response.data.message);
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        if (modifyPassword.newPassword !== modifyPassword.newPasswordVerify) {
            toast.warning('Les mots de passe ne correspondent pas');
            return;
        }
        try {
            const response = await userService.ChangePassword({
                code: modifyPassword.code,
                newPassword: modifyPassword.newPassword,
                email: modifyPassword.email
            });
            if (response.status === 200) {
                toast.success('Mot de passe changé avec succès');
                setFormType('loginConnect');
                setModifyPassword({
                    code: '',
                    newPassword: '',
                    newPasswordVerify: '',
                    email: ''
                });
            }
        } catch (error) {
            toast.error('Erreur lors du changement de mot de passe: ' + error.message);
        }
    };

    const Changeforgetpassword = async (e) => {
        e.preventDefault();
        if (forgetpassword.newPassword !== forgetpassword.newPasswordVerify) {
            toast.warning('Les mots de passe ne correspondent pas');
            return;
        }
        try {
            const response = await userService.ForgetPassword({
                code: forgetpassword.code,
                newPassword: forgetpassword.newPassword,
                email: forgetpassword.email
            });
            if (response.status === 200) {
                toast.success('Mot de passe changé avec succès');
                setIsForgotPassword(false);
                setForgetpassword({
                    code: '',
                    newPassword: '',
                    newPasswordVerify: '',
                    email: ''
                });
            }
        } catch (error) {
            toast.error('Erreur lors du changement de mot de passe: ' + error.message);
        }
    };

    const toggleForgotPassword = async (e) => {
        e.preventDefault();
        setIsForgotPassword(!isForgotPassword);
        try {
            await userService.ForgetPasswordSend(connect);
        } catch (error) {
            toast.error('Erreur lors de la connexion: ' + error.response.data.message);
        }
    };

    return (
        <>
            <ToastContainer />
            {formType === 'initial' && (
                <FirstForm login={login} connect={connect} handleChange={handleChange} />
            )}
            {formType === 'createConnect' && (
                <CreationForm modifyPassword={modifyPassword} handleChangeBis={handleChangeBis} changePassword={changePassword} />
            )}
            {formType === 'loginConnect' && (
                <LoginForm
                    handleChangelogin={handleChangelogin}
                    connectionMDP={connectionMDP}
                    loginpassword={loginpassword}
                    forgetpassword={forgetpassword}
                    Changeforgetpassword={Changeforgetpassword}
                    HandleChangeForget={HandleChangeForget}
                    toggleForgotPassword={toggleForgotPassword}
                    isForgotPassword={isForgotPassword}
                />
            )}
        </>
    );
};

export default Connection;
