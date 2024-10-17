import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Importar Link
import './Auth.css'; 
import leftImage from './imagenes/argus.jpg'; 
import rightImage from './imagenes/tipos-de-camaras-de-seguridad.jpg'; 

const Home = () => {
    const location = useLocation();
    const userName = location.state?.userName;
    const [zonas, setZonas] = useState([]);

    useEffect(() => {
        const fetchZonas = async () => {
            try {
                const response = await fetch('http://localhost:5000/zonas');
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                const data = await response.json();
                setZonas(data);
            } catch (error) {
                console.error('Error al obtener zonas:', error);
            }
        };

        fetchZonas();
    }, []);

    return (
        <div className="home-container">

            <div className='content'>
                <img src={leftImage} alt="Imagen izquierda" className="side-image" />
                <div className='container2'>
                    <h2>Proyecto Argus</h2>
                </div>
                <br />
                <div className='container3'>
                    <h2>Bienvenid@, {userName || 'Usuario'}!</h2>
                    <p>Estamos encantados de que estés aquí. Este es tu espacio personal donde puedes acceder a todas las zonas con mayor peligro en Aguascalientes.</p>
                    <p>Explora nuestras funcionalidades y aprovecha al máximo la plataforma.</p>
                    <h3>¿Qué puedes hacer aquí?</h3>
                    <ul>
                        <li>Checar cruceros más peligrosos.</li>
                        <li>Identificar posibles sospechosos.</li>
                        <li>Llamar a la policía vial de forma rápida en caso de algún accidente automovilístico.</li>
                    </ul>

                    <h3>Zonas de Peligro</h3>
                    <ul>
                        {zonas.length > 0 ? (
                            zonas.map((zona, index) => (
                                <li key={index}>{zona.NombreZona} - {zona.Descripcion || 'Sin descripción'}</li>
                            ))
                        ) : (
                            <li>Cargando zonas...</li>
                        )}
                    </ul>
                    
                    {/* Botón para ir al mapa */}
                    <Link to="/mapa">
                        <button className="map-button">Ver Mapa</button>
                    </Link>
                </div>
            </div>

            <div className="side-images">
                <img src={rightImage} alt="Imagen derecha" className="side-image" />
            </div>
        </div>
    );
};

export default Home;











