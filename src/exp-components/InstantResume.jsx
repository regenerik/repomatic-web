import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import uploadImage from '../img/input.png';  // Imagen ejemplo del Excel de entrada
import downloadImage from '../img/resultado.png';  // Imagen ejemplo del Excel de salida
import './InstantResume.css';  // El archivo CSS donde irán los estilos

const InstantResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const { actions } = useContext(Context);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);

      try {
        const blob = await actions.uploadFile(formData);
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setLoading(false);
        alert('Proceso finalizado. Descarga habilitada.');
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        setLoading(false);
        alert('Hubo un problema al subir el archivo');
      }
    } else {
      alert('Por favor, selecciona un archivo');
    }
  };

  const descargarArchivo = () => {
    const element = document.createElement('a');
    element.href = downloadUrl;
    element.download = 'evaluacion_estaciones.xlsx';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className='instant-resume-wrapper'>
      <h2 className='title'>Subir archivo Excel</h2>
      <div className='form-section'>
        {loading ? (
          <div>
            <p>Procesando archivo... Esto puede tardar 5.1 segundos por APIES.</p>
          </div>
        ) : downloadUrl ? (
          <button className='btn-download' onClick={descargarArchivo}>Descargar Evaluación</button>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="file" accept=".xlsx" onChange={handleFileChange} className='file-input' />
            <button type="submit" className='btn-upload'>Subir Archivo</button>
          </form>
        )}
      </div>

 {/* Primera fila (Input Excel) */}
 <div className='row'>
        <div className='col-6'>
          <section className='description'>
            <p>
              Esta herramienta permite subir una lista de APIES (estaciones de servicio) con sus comentarios en un Excel que tiene una primera columna <b>APIES</b> y una segunda columna <b>COMENTARIO</b>. 
              Podés subir entre 1 y 30 APIES. El resultado será un resumen detallado que le servirá al jefe de estación para conocer lo que los clientes piensan.
            </p>
          </section>
        </div>
        <div className='col-6'>
          <div className='image-container'>
            <h4>Ejemplo de Excel de Entrada:</h4>
            <img src={uploadImage} alt="Ejemplo Excel de Entrada" className='image' />
          </div>
        </div>
      </div>

      {/* Segunda fila (Output Excel) */}
      <div className='row'>
        <div className='col-6'>
          <section className='description'>
            <p>
              El reporte final incluye el puntaje de tres tópicos principales: <b>Sanitarios</b>, <b>Atención al Cliente</b>, y <b>Tiempo de Espera</b> además del resumen total. El proceso puede demorar 5.1 segundos por cada APIES adicional.
            </p>
          </section>
        </div>
        <div className='col-6'>
          <div className='image-container'>
            <h4>Ejemplo de Excel de Salida:</h4>
            <img src={downloadImage} alt="Ejemplo Excel de Salida" className='image' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantResume;
