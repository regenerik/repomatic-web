import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../js/store/appContext.js';
import uploadImage from '../img/input.png';  // Imagen ejemplo del Excel de entrada
import './TotalResume.css';  // El archivo CSS donde irán los estilos

const TotalResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existeOnline, setExisteOnline] = useState(false);
  const [dateTime, setDateTime] = useState(""); 
  const { actions } = useContext(Context);

  // Al cambiar el archivo
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Al hacer submit (subir archivo)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);

      try {
        const response = await actions.uploadExcel(formData); // Action para subir
        if (response.ok) {
          alert('Archivo subido exitosamente.');
          const result = await actions.existencia();
          if (result) {
            setExisteOnline(true);
            console.log("HEEEEEEEEEEEEY setDateTime: ",result);
            setDateTime(result);
          }
        } else {
          alert('Error al subir el archivo');
        }
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        alert('Hubo un problema al subir el archivo');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Por favor, selecciona un archivo');
    }
  };

  // Descargar el Excel
  const descargarArchivo = async () => {
    try {
      setLoading(true);
      const blob = await actions.downloadExcel(); // Action para descargar
      const url = URL.createObjectURL(blob);
      const element = document.createElement('a');
      element.href = url;
      element.download = 'evaluacion_estaciones.xlsx';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      alert('Descarga completada.');
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      alert('Hubo un problema al descargar el archivo');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar el archivo Excel con confirmación
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que querés eliminar la información de los comentarios de las APIES actuales?");
    if (confirmDelete) {
      try {
        setLoading(true);
        const response = await actions.deleteExcel(); // Action para eliminar
        if (response.ok) {
          alert('Archivo eliminado exitosamente.');
          setExisteOnline(false);  // Actualizar el estado si se elimina
          setDateTime("");  // Limpiar la fecha
        } else {
          alert('Error al eliminar el archivo');
        }
      } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        alert('Hubo un problema al eliminar el archivo');
      } finally {
        setLoading(false);
      }
    }
  };

  // Comprobar si existe un Excel en la base de datos al cargar el componente
  useEffect(() => {
    const checkExistencia = async () => {
      let result = await actions.existencia();
      console.log("este es el result del useEffect que deberia tener la fecha: ",result);
      if (result) {
        setExisteOnline(true);
        setDateTime(result);  // Guardar la fecha y hora
      }
    };
    checkExistencia();
  }, [actions]);

  return (
    <div className='instant-resume-wrapper'>
      <h2 className='title'>Subir, Descargar o Eliminar Excel de todos los comentarios mensuales</h2>
      <div className='form-section'>
        {loading ? (
          <div>
            <p>Procesando... Por favor espera.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <input type="file" accept=".xlsx" onChange={handleFileChange} className='file-input' />
              <button type="submit" className='btn-upload'>Subir Archivo</button>
            </form>
            {existeOnline && (
              <div className="button-container">
                <button className='btn-download' onClick={descargarArchivo}>Descargar Evaluación</button>
                <button className='btn-delete' onClick={handleDelete}>Eliminar Archivo</button>
                <p className='file-info'>Última versión subida el: {dateTime}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Primera fila (Input Excel) */}
      <div className='row'>
        <div className='col-6'>
          <section className='description'>
            <p>
              Esta herramienta permite subir la lista de APIES mensual con sus comentarios en un Excel.
              La misma queda disponible para hacer recuperación de resúmenes de comentarios en "Obtener un resumen". 
              El excel puede ser pisado por uno nuevo,descargado y/o eliminado.
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
    </div>
  );
};

export default TotalResume;
