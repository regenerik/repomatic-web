import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import Navbar from './Navbar.jsx';
import { useNavigate } from 'react-router';

export default function FormsList() {
  const { actions,store } = useContext(Context);
  // const [forms, setForms] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      await actions.getForms();
    })();
  }, [actions]);

  const handleDownload = (id) => actions.downloadForm(id);
  const handleDownloadAll = () => actions.getAllForms();

  // formatea 28/04/2025 → 28/04/25
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(d);
  };

  const handleGoToFormList = () => {
    navigate('/form')
  }

  const handleDelete = (id) => {
    actions.deleteFormById(id);
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

        {/* Contenedor con scroll */}
        <div
          style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: 16,
            height: '75vh',
            overflowY: 'auto'
          }}
        >
          {store.listaForms.length === 0 ? (
            <p style={{ color: '#6b7280', margin: 0 }}>Cargando formularios.<br/>Si no carga en menos de 5 segundos, no hay formularios disponibles.</p>
          ) : (
            store.listaForms.map(form => (
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
                    color: '#ef4444', // rojo bonito
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