import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Auth.css'; 
import Home from './Home.js';


const Auth = () => {
    const navigate = useNavigate(); 
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ nombre: '', email: '', contraseña: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la autenticación real
        setIsAuthenticated(true);
        navigate('/home', { state: { userName: formData.nombre || formData.email } }); // Redirige a Home con el estado del usuario
    };

    if (isAuthenticated) {
        return <Home userName={formData.nombre || formData.email} />; // Muestra el componente Home
    }

    return (
        <div className="container">
            <h1>Proyecto Argus</h1>
            <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>
                            Nombre:
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required={!isLogin} />
                        </label>
                    </div>
                )}
                <div>
                    <label>
                        Correo electrónico:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Contraseña:
                        <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
                    </label>
                </div>
                <button type="submit">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</button>
            </form>
            <p>
                {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Registrarse' : 'Iniciar sesión'}
                </button>
            </p>
        </div>
    );
};

export default Auth;




