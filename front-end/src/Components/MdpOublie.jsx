import React, { useState } from 'react';
import "../Styles/Form.css";

const Creation = ({ forgetpassword, Changeforgetpassword, HandleChangeForget }) => {

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordVerify, setShowNewPasswordVerify] = useState(false);

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }

    const toggleShowNewPasswordVerify = () => {
        setShowNewPasswordVerify(!showNewPasswordVerify);
    }

    return (
        <>
            <div className='back-test'>
                <div className="wrapper">
                    <form className="Login">
                        <h1>Choisissez un nouveau mot de passe</h1>
                        <p style={{ fontSize: '0.9rem' }}>Un mail vous a été envoyé avec votre code.</p>
                        <div className="input-box">
                            <input 
                                type="text" 
                                placeholder="Code" 
                                value={forgetpassword.code} 
                                name='code' 
                                required 
                                onChange={HandleChangeForget} 
                            />
                            <i className='bx bx-cog'></i>
                        </div>
                        <div className="input-box">
                            <input 
                                type={showNewPassword ? "text" : "password"} 
                                placeholder="Nouveau Mot de Passe" 
                                value={forgetpassword.newPassword} 
                                name="newPassword" 
                                required 
                                onChange={HandleChangeForget} 
                            />
                            <i 
                                className={showNewPassword ? 'bx bxs-show' : 'bx bxs-hide'} 
                                onClick={toggleShowNewPassword}
                            ></i>
                        </div>
                        <div className="input-box">
                            <input 
                                type={showNewPasswordVerify ? "text" : "password"} 
                                placeholder="Confirmer le nouveau Mot de Passe" 
                                value={forgetpassword.newPasswordVerify} 
                                name="newPasswordVerify" 
                                required 
                                onChange={HandleChangeForget} 
                            />
                            <i 
                                className={showNewPasswordVerify ? 'bx bxs-show' : 'bx bxs-hide'} 
                                onClick={toggleShowNewPasswordVerify}
                            ></i>
                        </div>

                        <button type="submit" onClick={Changeforgetpassword} className="btn">Envoyer</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Creation;
