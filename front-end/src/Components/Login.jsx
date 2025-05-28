import React, { useState } from 'react';
import "../Styles/Form.css";
import MdpOublie from '../Components/MdpOublie';

const Login = ({ handleChangelogin, connectionMDP, loginpassword, forgetpassword, Changeforgetpassword, HandleChangeForget, toggleForgotPassword, isForgotPassword }) => {
    
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            {!isForgotPassword ? (
                <div className='back-test'>
                    <div className="wrapper">

                        <form className="Login" onSubmit={loginpassword}>
                            <h1>Connexion</h1>
                            <div className="input-box">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Mot de Passe" 
                                    name="password" 
                                    value={connectionMDP.password} 
                                    required 
                                    onChange={handleChangelogin} 
                                />
                                <i 
                                    className={showPassword ? 'bx bxs-show' : 'bx bxs-hide'} 
                                    onClick={toggleShowPassword}
                                ></i>
                            </div>
                            <div className="remember-forgot">
                                <div className='remember-forgot-coche'>
                                </div>
                                <a type="button" onClick={toggleForgotPassword}>Mot de passe oublié ?</a>
                            </div>
                            <button type="submit" className="btn">Se connecter</button>
                        </form>

                    </div>
                </div>) : (
                <MdpOublie forgetpassword={forgetpassword} Changeforgetpassword={Changeforgetpassword} HandleChangeForget={HandleChangeForget}/>
            )}
        </>
    );
}

export default Login;
