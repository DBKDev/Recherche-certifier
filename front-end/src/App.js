import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RecherchePage from "./Views/Recherche.jsx";
import Connection from "./Views/Connection.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setLoggedIn = (loggedIn) => {
        setIsLoggedIn(loggedIn);
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Page protégée */}
                    <Route path="/Recherche" element={isLoggedIn ? <RecherchePage /> : <Navigate to="/" replace />} />
                    
                    {/* Page de connexion */}
                    <Route path="/" element={<Connection setLoggedIn={setLoggedIn} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
