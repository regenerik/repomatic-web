import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import Navbar from './Navbar.jsx';
import { useNavigate } from 'react-router';

export default function FormsList() {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  // Estados para filtros y lista filtrada
  const [filteredForms, setFilteredForms] = useState([]);
  const [filterGestor, setFilterGestor] = useState('');
  const [filterApies, setFilterApies] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Cargar forms desde el store
  useEffect(() => {
    (async () => {
      await actions.getForms();
    })();
  }, [actions]);

  // Inicializar lista filtrada cuando cambie store.listaForms
  useEffect(() => {
    setFilteredForms(store.listaForms);
  }, [store.listaForms]);

  // Aplicar filtros siempre que cambien
  useEffect(() => {
    let list = store.listaForms;
    if (filterGestor) {
      list = list.filter(f =>
        f.gestor.toLowerCase().includes(filterGestor.toLowerCase())
      );
    }
    if (filterApies) {
      list = list.filter(f =>
        f.apies?.toString().includes(filterApies)
      );
    }
    if (filterDate) {
      // Comparar directamente la parte de fecha sin timezone
      list = list.filter(f => {
        const recordDate = f.creado_en.slice(0, 10);
        return recordDate === filterDate;
      });
    }
    setFilteredForms(list);
  }, [filterGestor, filterApies, filterDate, store.listaForms]);

  // ----------------UseEffect para chequear token----------------
   useEffect(() => {
    (async () => {
      const valid = await actions.checkToken();
      if (!valid) {
        // Usar acción logout para limpiar store y localStorage
        actions.logout();
        // Redirigir a login
        navigate('/');
      }
    })();
  }, []);

  const handleDownload = (id) => actions.downloadForm(id);
  const handleDownloadAll = () => actions.getAllForms();
  const handleGoToFormList = () => navigate('/form');
  const handleDelete = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro que querés eliminar este formulario?\nMirá que no hay vuelta atrás..."
    );
    if (confirmacion) actions.deleteFormById(id);
  };

  // formatea fecha y hora
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const fecha = new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(d);

    const hora = d.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${fecha} — ${hora}`;
  };

  const clearFilters = () => {
    setFilterGestor('');
    setFilterApies('');
    setFilterDate('');
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', marginTop: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'flex-end' }}>
          {/* Botón “Llenar formulario” */}
          <button
            onClick={handleGoToFormList}
            style={{
              padding: '8px 16px',
              backgroundColor: '#16a34a',
              color: '#000',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Llenar Formulario
          </button>

          {/* Botón “Descargar todos” */}
          <button
            onClick={handleDownloadAll}
            style={{
              padding: '8px 16px',
              backgroundColor: '#16a34a',
              color: '#000',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Descargar todos
          </button>
        </div>

        {/* Filtros: 2 filas para inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <input
              type="text"
              placeholder="Filtrar por gestor"
              value={filterGestor}
              onChange={e => setFilterGestor(e.target.value)}
              style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
            <input
              type="text"
              placeholder="Filtrar por apies"
              value={filterApies}
              onChange={e => setFilterApies(e.target.value)}
              style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
            <button
              onClick={clearFilters}
              style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #888', background: '#fff', cursor: 'pointer' }}
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Contenedor con scroll */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: 16,
            height: '75vh',
            minHeight: 200,
            overflowY: 'auto',
            marginBottom: '4vh'
          }}
        >
          {store.listaForms.length === 0 ? (
            <p style={{ color: '#6b7280', margin: 0 }}>
              Cargando formularios.
              <br />
              Si no carga en menos de 5 segundos, no hay formularios disponibles.
            </p>
          ) : filteredForms.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', margin: 0 }}>
              No se encontraron formularios con esos filtros.
            </p>
          ) : (
            filteredForms.map(form => (
              <div
                key={form.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'min-content 1fr min-content min-content',
                  columnGap: '1rem',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  borderBottom: '1px solid #e5e7eb',
                  padding: '8px 0'
                }}
              >
                {/* Fecha */}
                <span style={{ color: '#6b7280', flexShrink: 0 }}>
                  {formatDate(form.creado_en)}
                </span>

                {/* Gestor — Curso */}
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {form.gestor} — {form.curso}
                </span>

                {/* Ícono descarga */}
                <button
                  onClick={() => handleDownload(form.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    color: '#3b82f6',
                    flexShrink: 0
                  }}
                >
                  <i className="fa fa-download" />
                </button>
                <button
                  onClick={() => handleDelete(form.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    color: '#ef4444',
                    flexShrink: 0
                  }}
                >
                  <i className="fa fa-trash" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}