import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../js/store/appContext.js';

export default function FormsList() {
  const { actions } = useContext(Context);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await actions.getForms();
      if (data) setForms(data);
    })();
  }, [actions]);

  const handleDownload = (id) => {
    actions.downloadForm(id);
  };

  const handleDownloadAll = () => {
    actions.getAllForms();
  };

  return (
    <div className="space-y-2">
      {/* Botón para bajar todo */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleDownloadAll}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Descargar todos
        </button>
      </div>

      {/* Lista con altura fija y scroll */}
      <div
        className="bg-white rounded shadow p-4"
        style={{ height: '25vh', overflowY: 'auto' }}
      >
        {forms.length === 0 && (
          <p className="text-gray-500">No hay formularios aún.</p>
        )}
        {forms.map(form => (
          <div
            key={form.id}
            className="flex justify-between items-center border-b last:border-0 py-2"
          >
            <div className="flex space-x-4 items-center">
              {/* Solo fecha, sin hora */}
              <p className="text-sm text-gray-600">
                {new Date(form.creado_en).toLocaleDateString()}
              </p>
              <p className="font-medium">
                {form.gestor} — {form.curso}
              </p>
            </div>
            <button
              onClick={() => handleDownload(form.id)}
              className="text-blue-500 hover:text-blue-700 text-xl"
            >
              <i className="fa fa-download" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
