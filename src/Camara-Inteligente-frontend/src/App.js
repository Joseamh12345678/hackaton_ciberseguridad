import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import Mapa from './mapa';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mapa" element={<Mapa />} />
        </Routes>
    );
};

export default App;


