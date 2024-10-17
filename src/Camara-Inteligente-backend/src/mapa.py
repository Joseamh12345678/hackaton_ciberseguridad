import folium
import pandas as pd
from flask import Flask, jsonify, send_file
from flask_cors import CORS
import os

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app)  # Permitir CORS

def cargar_datos():
    """Cargar los datos desde un archivo CSV."""
    try:
        # Asegúrate de que la ruta del archivo CSV sea correcta
        data = pd.read_csv('C:\\Users\\José Martinez\\Documents\\Hackaton-de-ciberseguridad\\camara-de-seguridad\\backend\\zonas_peligro.csv')
        return data
    except Exception as e:
        print(f"Error al cargar los datos: {str(e)}")
        return None

@app.route('/zonas', methods=['GET'])
def get_zonas():
    """Endpoint para obtener las zonas desde el archivo CSV."""
    data = cargar_datos()
    if data is not None:
        zonas = data.to_dict(orient='records')  # Convertir a diccionario
        return jsonify(zonas)  # Retornar los datos en formato JSON
    else:
        return jsonify({'error': 'No se pudieron cargar los datos.'}), 500  # Retornar un error si ocurre

def crear_mapa(data):
    """Crear un mapa con los datos proporcionados y guardarlo como archivo HTML."""
    # Crear un mapa centrado en Aguascalientes
    mapa = folium.Map(location=[21.8830, -102.2916], zoom_start=12)

    # Colores para diferentes niveles de peligro
    color_mapping = {
        'Alto': 'red',
        'Medio': 'orange',
        'Bajo': 'green'
    }

    # Agregar marcadores al mapa
    for _, row in data.iterrows():
        folium.Marker(
            location=[row['Latitud'], row['Longitud']],
            popup=row['NombreZona'] + f" - Peligro: {row['Peligro']}" + f" - Descripción: {row.get('Descripcion', 'No disponible')}",
            icon=folium.Icon(color=color_mapping.get(row['Peligro'], 'gray'))  # Usar 'gray' por defecto si no hay un mapeo
        ).add_to(mapa)

    # Guardar el mapa en un archivo HTML
    map_file_path = 'mapa_aguas_calientes.html'
    mapa.save(map_file_path)
    print(f"Mapa creado y guardado como '{map_file_path}'")
    return map_file_path

@app.route('/mapa', methods=['GET'])
def get_mapa():
    """Generar y retornar el mapa como archivo HTML."""
    data = cargar_datos()
    if data is not None:
        map_file_path = crear_mapa(data)  # Esto genera el mapa y guarda el archivo HTML
        return send_file(map_file_path)  # Retornar el archivo HTML del mapa
    else:
        return jsonify({'error': 'No se pudieron cargar los datos.'}), 500

if __name__ == '__main__':
    # Cargar los datos y crear el mapa (opcional, según tu flujo de trabajo)
    datos = cargar_datos()
    if datos is not None:
        crear_mapa(datos)  # Generar el mapa al iniciar la aplicación
    app.run(debug=True)


    

