import React, { useEffect, useState } from 'react';

const Mapa = () => {
    const [mapUrl, setMapUrl] = useState('');

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const response = await fetch('http://localhost:5000/mapa'); // Endpoint del mapa
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setMapUrl(url);
                } else {
                    throw new Error('Error al cargar el mapa');
                }
            } catch (error) {
                console.error('Error al obtener el mapa:', error);
            }
        };

        fetchMap();
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            {mapUrl ? (
                <iframe 
                    src={mapUrl} 
                    width="500px"  // Ancho ajustado al 90% de la altura de la ventana (cuadrado)
                    height="500px" // Altura ajustada al 90% de la ventana
                    style={{ border: 'none' }} 
                    title="Mapa de Peligro"
                ></iframe>
            ) : (
                <p>Cargando mapa...</p>
            )}
        </div>
    );
};

export default Mapa;