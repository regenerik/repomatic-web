import React from 'react';
import Navbar from '../components/Navbar';
import './SaberMas.css';
import teamWorkingImg from '../img/team_working-min2.jpg'; // Imagen de personas trabajando
import happyPersonImg from '../img/happy_person-min2.jpg'; // Imagen de alguien feliz mirando al horizonte

const SaberMas = () => {
  return (
    <div className='saber_mas_general d-flex flex-column align-items-center'>
      <Navbar />
      <div className="saber-mas-container">
        <div className="saber-mas-content">
          <h2>Sobre Nosotros</h2>
          <div className="saber-mas-section">
            <div className="saber-mas-text">
              <p>
                Nuestro sitio y servidor están diseñados para manejar inteligentemente los reportes obtenidos del campus YPF. Con el objetivo de generar reportes más dinámicos y organizados, esta plataforma permite a los usuarios gestionar y visualizar información clave de manera eficiente.
              </p>
            </div>
            <div className="saber-mas-image">
              <img src={teamWorkingImg} alt="Equipo trabajando" className="img-responsive" />
            </div>
          </div>
          <div className="saber-mas-section reverse">
            <div className="saber-mas-text">
              <p>
                La aplicación fue desarrollada por el equipo de <strong>"Apoyo a la Gestión y explotación de datos"</strong> en el año 2024.
              </p>
            </div>
            <div className="saber-mas-image">
              <img src={happyPersonImg} alt="Persona feliz" className="img-responsive" />
            </div>
          </div>
          <div className="saber-mas-footer">
            <p>
              Para más información técnica, podés acceder a la documentación del servidor en el siguiente enlace:
            </p>
            <a href="https://repomatic.onrender.com" target="_blank" rel="noopener noreferrer" className="btn-doc-link">
              Ver Documentación del Servidor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaberMas;
