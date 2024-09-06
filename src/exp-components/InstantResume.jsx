import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';


const InstantResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { actions, store } = useContext(Context); // Agregamos `store` para acceder al estado global

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true); // Mostrar el mensaje de carga

      try {
        // Llamada al action
        await actions.uploadFile(formData);
        setLoading(false); // Ocultar el mensaje de carga cuando termine
        alert('Proceso finalizado. Descarga habilitada.');
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        setLoading(false); // En caso de error, ocultar el mensaje de carga
        alert('Hubo un problema al subir el archivo');
      }
    } else {
      alert('Por favor, selecciona un archivo');
    }
  };

  const descargarArchivo = () => {
    const element = document.createElement('a');
    const file = new Blob([store.message], { type: 'text/plain' }); // Utilizamos el `store.message`
    element.href = URL.createObjectURL(file);
    element.download = 'evaluacion_estaciones.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <h2>Subir archivo Excel</h2>
      <h6>Esta herramienta es muy simple. Podes subirle un excel "xlsx" que su primera columna sea "APIES" y la segunda "COMENTARIO". Puede ser de 1 hasta 30 APIES en simultaneo con sus comentarios en la segunda columna sin problemas. Recordá que por cada APIES va a demorar +5,1 segundos. Asique dependiendo de la cantidad que subas, podés ir haciendo la cuenta para sacar la demora.</h6>
      <h6>Objetivo: Hacemos un resumen de los comentarios de cada estación de servicio(APIES) via servicio Openai(Inteligencia Artificial), y te lo devolvemos todo en un ".txt" bien formateado.</h6>
      {/* Si está cargando, mostramos un mensaje de carga */}
      {loading ? (
        <div>
          <p>Procesando archivo... Esto puede tardar 5.1 segundos por APIES.</p>
        </div>
      ) : store.message ? (
        <div>
          {/* Botón para descargar el archivo cuando se haya subido */}
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

