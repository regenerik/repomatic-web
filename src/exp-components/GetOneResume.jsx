import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';

const GetOneResume = () => {
  const [apies, setApies] = useState(''); 
  const [loading, setLoading] = useState(false);
  const { actions } = useContext(Context); 
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await actions.getOneResume(apies); // Llamada al action desde el contexto
    } catch (error) {
      setError('Hubo un problema con la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Pedir resumen de estación de servicio</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', border: '1px solid #007bff', padding: '20px', borderRadius: '8px' }}>
        <input
          type="text"
          placeholder="Ingrese número de APIES"
          value={apies}
          onChange={(e) => setApies(e.target.value)}
          style={{ border: '1px solid #007bff', borderRadius: '4px', padding: '10px', marginRight: '10px' }}
        />
        <button
          type="submit"
          style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', border: 'none' }}
        >
          {loading ? 'Cargando...' : 'Pedir y descargar'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p style={{ marginTop: '20px' }}>Ingresa el número de APIES para descargar el resumen de la evaluación.</p>
    </div>
  );
};

export default GetOneResume;