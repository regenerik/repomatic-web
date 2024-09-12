import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';

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
        // Llamada al action
        const blob = await actions.uploadFile(formData);

        // Crear URL de descarga para el archivo Excel
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
    <div>
      <h2>Subir archivo Excel</h2>
      {loading ? (
        <div>
          <p>Procesando archivo... Esto puede tardar 5.1 segundos por APIES.</p>
        </div>
      ) : downloadUrl ? (
        <div>
          <button onClick={descargarArchivo}>Descargar Evaluación</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <button type="submit">Subir Archivo</button>
        </form>
      )}
    </div>
  );
};

export default InstantResume;
