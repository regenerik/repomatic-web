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
  }, []);

  const handleDownload = (id) => {
    actions.downloadForm(id);
  };

  return (
    <div
      className="bg-white rounded shadow p-4"
      style={{ height: '25vh', overflowY: 'auto' }}
    >
      {forms.map(form => (
        <div
          key={form.id}
          className="flex justify-between items-center mb-3"
        >
          <div>
            <p className="text-sm text-gray-600">
              {new Date(form.creado_en).toLocaleString()}
            </p>
            <p className="font-semibold">
              {form.gestor} — {form.curso}
            </p>
          </div>
          <button
            onClick={() => handleDownload(form.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            ↓
          </button>
        </div>
      ))}
    </div>
  );
}