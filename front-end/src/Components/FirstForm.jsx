import React, { useState } from 'react';
import "../Styles/Form.css";
import ReCAPTCHA from 'react-google-recaptcha';

const FirstForm = ({ login, handleChange, connect }) => {
    const recaptchaRef = React.createRef();
    const [capVal, setCapVal] = useState(null);
    const [emailFilled, setEmailFilled] = useState(false);

    const errorHandler = () => {
        alert("Vous avez tenté de vous connecter trop de fois. Veuillez réessayer plus tard.")
    }

    const handleInputChange = (e) => {
        handleChange(e); // Appeler la fonction handleChange fournie par les props
        setEmailFilled(e.currentTarget.value.trim() !== ''); // Vérifier si l'email n'est pas vide
    }

    return (
        <div className='back-test'>
            <div className="wrapper">
                <form className="Login">
                    <h1>Connexion</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Adresse Mail" name='email' value={connect.email} required onChange={handleInputChange} />
                        <i className='bx bxs-user'></i>
                    </div>
                    <button type="submit" className="btn" onClick={login} disabled={!emailFilled}>Se connecter</button>
                    {/* <ReCAPTCHA
                        sitekey='6LcHYwYqAAAAABaguQX5caEGEXMfqXcC0QVvzn-4'
                        onChange={(val) => setCapVal(val)}
                        onErrored={errorHandler}
                        size="invisible"
                        theme='dark'
                        ref={recaptchaRef}
                    /> */}
                </form>
            </div>
        </div>
    );
}

export default FirstForm;
