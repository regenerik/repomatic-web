import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import logo from '../img/logo.png'

export default function CourseForm() {
  const { actions } = useContext(Context)
  // Inyectar Tailwind vía CDN
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Datos estáticos
  const objetivosContenido = {
    'WOW Tienda': {
      objetivo: 'Optimizar las oportunidades de venta y fidelización en tienda y playa. Con este enfoque integral, el equipo podrá mejorar el servicio y maximizar el mix de productos, aumentando las ventas y asegurando la satisfacción del cliente en cada visita.',
      contenido: '• Gestión de la experiencia del cliente en cada etapa del ciclo de servicio.\n• Estrategias para maximizar rentabilidad y promover ventas.\n• Técnicas de comunicación y atención efectiva.\n• Elaboración de café, alimentos y prácticas de seguridad en tienda.\n• Dominio de productos de playa (lubricantes y combustibles).\n• Verificación de normas de seguridad y cumplimiento.'
    },
    'WOW Playa': {
      objetivo: 'Optimizar las oportunidades de venta y fidelización en tienda y playa. Con este enfoque integral, el equipo podrá mejorar el servicio y maximizar el mix de productos, aumentando las ventas y asegurando la satisfacción del cliente en cada visita.',
      contenido: '• Gestión de la experiencia del cliente en cada etapa del ciclo de servicio.\n• Estrategias para maximizar rentabilidad y promover ventas.\n• Técnicas de comunicación y atención efectiva.\n• Elaboración de café, alimentos y prácticas de seguridad en tienda.\n• Dominio de productos de playa (lubricantes y combustibles).\n• Verificación de normas de seguridad y cumplimiento.'
    },
    'PEC 1.0': {
      objetivo: 'Transforma la manera en que tu equipo de venta se relaciona con los clientes y genera una conexión única. En este programa, tus vendedores aprenderán a crear experiencias memorables desde el primer momento, logrando que cada cliente se sienta atendido y valorado. Descubrirán el nuevo modelo de relacionamiento y los pilares de la experiencia del cliente (CX), habilidades que los harán destacar en el mercado y fidelizarán a cada visitante.',
      contenido: '• Los pilares esenciales de CX para maximizar la satisfacción.\n• Herramientas de gestión para un desempeño impecable.\n• Creación de experiencias guiadas que fidelizan a los clientes.\n• Modelos de relacionamiento que crean conexiones duraderas.'
    },
    'PEC 2.0': {
      objetivo: 'Transformar tu dotación y consolidar un equipo que sea referente en servicio al cliente. Este programa les brinda a tus vendedores las técnicas y estrategias para aplicar el modelo de conexión emocional, haciendo que cada miembro de tu equipo sea un embajador de la experiencia del cliente, capaz de influir y cautivar a cada visitante.',
      contenido: '• Técnicas avanzadas para generar conexión emocional con el cliente.\n• Herramientas prácticas para crear experiencias únicas en cada interacción.\n• Ejecución y monitoreo de un ciclo de servicio que fideliza.\n• Estrategias para potenciar la motivación y el compromiso del equipo.\n• Casos de éxito en la aplicación de modelos de relacionamiento efectivo.'
    }
  };

  // const gestoresEmail = {
  //   'Jose L. Gallucci': 'jose.l.gallucci@ypf.com',
  //   'Mauricio Cuevas': 'mauricio.cuevas@ypf.com',
  //   'John Martinez': 'john.martinez@ypf.com',
  //   'Georgina M. Cutili': 'georgina.m.cutili@ypf.com',
  //   'Octavio Torres': 'octavio.torres@ypf.com',
  //   'Fernanda M. Rodriguez': 'fernanda.m.rodriguez@ypf.com',
  //   'Pablo J. Raggio': 'pablo.j.raggio@ypf.com',
  //   'Noelia Otarula': 'noelia.otarula@ypf.com',
  //   'Dante Merluccio': 'dante.merluccio@ypf.com'
  // };

  const gestoresEmail = {
    'Jose L. Gallucci': 'nahuel.paz@ypf.com',
    'Mauricio Cuevas': 'nahuel.paz.cx@gmail.com',
    'John Martinez': 'nahuel.paz.cx@gmail.com',
    'Georgina M. Cutili': 'nahuel.paz.cx@gmail.com',
    'Octavio Torres': 'nahuel.paz.cx@gmail.com',
    'Fernanda M. Rodriguez': 'nahuel.paz.cx@gmail.com',
    'Pablo J. Raggio': 'nahuel.paz.cx@gmail.com',
    'Noelia Otarula': 'nahuel.paz.cx@gmail.com',
    'Dante Merluccio': 'regenerik@gmail.com'
  };

  const recomendacionesMapping = {
    'WOW Playa': [
      'Ciclo de servicio: combustibles líquidos (líquido y GNC)',
      'Programa cultura Experiencia del cliente v2.0',
      'Nuestros productos combustibles / lubricantes'
    ],
    'WOW Tienda': [
      'Ciclo de servicios Tienda',
      'Programa cultura Experiencia del cliente v2.0',
      'Elaboración de café'
    ],
    'PEC 2.0': [
      'Programa cultura Experiencia del cliente v2.0',
      'e-Class La voz que escuchamos'
    ],
    'PEC 1.0': [
      'Programa cultura Experiencia del cliente v2.0',
      'e-Class La voz que escuchamos'
    ]
  };

  const initialFormData = {
    apies: '',
    curso: '',
    fecha: '',
    gestor: '',
    duracionHoras: '',
    objetivo: '',
    contenidoDesarrollado: '',
    ausentes: '',
    presentes: '',
    resultadosLogros: '',
    compromiso: '',
    participacionActividades: '',
    concentracion: '',
    cansancio: '',
    interesTemas: '',
    recomendaciones: {},
    otrosAspectos: '',
    firmaFile: null,
    nombreFirma: '',
    emailGestor: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  // Actualizar objetivo, contenido y recomendaciones
  useEffect(() => {
    if (!formData.curso) return;
    const { objetivo, contenido } = objetivosContenido[formData.curso];


    const recs = Object.fromEntries(
      Object.entries(recomendacionesMapping).filter(
        ([key]) =>
          key !== formData.curso &&                               // sale el mismo curso
          !(formData.curso === 'PEC 2.0' && key === 'PEC 1.0')    // sale PEC 1.0 si estamos en 2.0
      )
    );


    setFormData(prev => ({
      ...prev,
      objetivo,
      contenidoDesarrollado: contenido,
      recomendaciones: recs
    }));
  }, [formData.curso]);

  // Actualizar emailGestor
  useEffect(() => {
    if (!formData.gestor) return;
    setFormData(prev => ({ ...prev, emailGestor: gestoresEmail[formData.gestor] }));
  }, [formData.gestor]);

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, firmaFile: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const required = [
      'apies', 'curso', 'fecha', 'gestor', 'duracionHoras',
      'ausentes', 'presentes', 'resultadosLogros',
      'compromiso', 'participacionActividades', 'concentracion', 'cansancio', 'interesTemas'
    ];
    return required.every(f => !!formData[f]) && formData.resultadosLogros.length >= 20;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Completa todos los campos y asegura al menos 20 caracteres en "Resultados y logros".');
      return;
    }
    console.log('Enviando datos:', formData);
    let result = await actions.sendForm(formData)
    if (result) {
      alert('Formulario enviado con éxito');
      setFormData(initialFormData);
    } else {
      alert('Error al enviar el formulario');
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white bg-opacity-50 shadow rounded mt-4 mb-4">
      <div className="d-flex flex-column align-items-center">
        <img
          src={logo}
          alt="el logo"
          className="img-fluid w-20 mb-3"
        />
        <h1 className="font-size fw-bold">
          Formulario para Gestores YPF
        </h1>
        <br />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* APIES */}
        <div>
          <label className="block font-semibold mb-1">APIES</label>
          <input
            type="text"
            name="apies"
            value={formData.apies}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* Curso */}
        <div>
          <label className="block font-semibold mb-1">Nombre del Curso</label>
          <select
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Selecciona un curso --</option>
            {Object.keys(objetivosContenido).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {/* Fecha */}
        <div>
          <label className="block font-semibold mb-1">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* Gestor */}
        <div>
          <label className="block font-semibold mb-1">Gestor Regional</label>
          <select
            name="gestor"
            value={formData.gestor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Selecciona un gestor --</option>
            {Object.keys(gestoresEmail).map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        {/* Duración */}
        <div>
          <label className="block font-semibold mb-1">Duración en Horas</label>
          <input
            type="number"
            name="duracionHoras"
            value={formData.duracionHoras}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* Ausentes */}
        <div>
          <label className="block font-semibold mb-1">Ausentes</label>
          <input
            type="number"
            name="ausentes"
            value={formData.ausentes}
            onChange={handleChange}
            min="0"
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* Presentes */}
        <div>
          <label className="block font-semibold mb-1">Presentes</label>
          <input
            type="number"
            name="presentes"
            value={formData.presentes}
            onChange={handleChange}
            min="0"
            className="w-full border p-2 rounded"
            required
          />
        </div>
      </div>

      {/* Objetivos y Contenido */}
      <div className="mt-4">
        <label className="block font-semibold mb-1">Objetivos del Curso</label>
        <textarea
          name="objetivo"
          value={formData.objetivo}
          readOnly
          rows="3"
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>
      <div className="mt-4">
        <label className="block font-semibold mb-1">Contenido Desarrollado</label>
        <textarea
          name="contenidoDesarrollado"
          value={formData.contenidoDesarrollado}
          readOnly
          rows="4"
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>

      {/* Resultados y logros */}
      <div className="mt-4">
        <label className="block font-semibold mb-1">Resultados y logros</label>
        <textarea
          name="resultadosLogros"
          value={formData.resultadosLogros}
          onChange={handleChange}
          placeholder="Comentarios respecto del dictado, participación e involucramiento de los participantes"
          rows="4"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Observaciones */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ['Nivel de compromiso en el curso', 'compromiso'],
          ['Nivel de participación en las actividades sugeridas', 'participacionActividades'],
          ['Nivel de concentración durante el curso', 'concentracion'],
          ['Nivel de cansancio', 'cansancio'],
          ['Interés en los temas', 'interesTemas']
        ].map(([label, name]) => (
          <div key={name}>
            <p className="font-semibold mb-1">{label}</p>
            {['alto', 'medio', 'bajo'].map(opt => (
              <label key={opt} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name={name}
                  value={opt}
                  checked={formData[name] === opt}
                  onChange={handleChange}
                  required
                  className="mr-1"
                />
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Otros aspectos y firma */}
      <div className="mt-4">
        <label className="block font-semibold mb-1">Otros aspectos a destacar</label>
        <textarea
          name="otrosAspectos"
          value={formData.otrosAspectos}
          onChange={handleChange}
          rows="3"
          className="w-full border p-2 rounded"
          placeholder='Completar de ser necesario con los detalles de las observaciones marcadas en el punto anterior.'
        />
      </div>

      {/* Recomendaciones */}
      <div className="mt-4">
        <p className="font-semibold mb-1">Recomendaciones</p>
        {Object.entries(formData.recomendaciones).map(([curso, items]) => (
          <div key={curso} className="mb-2">
            <p className="underline font-semibold">{curso}</p>
            <ul className="list-disc list-inside">
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>


      <div className="mt-4">
        <label className="block font-semibold mb-1">Firma (Se verá como firma en el pdf resultante.)</label>
        {/* <input
          type="file"
          name="firmaFile"
          accept="image/*"
          onChange={handleChange}
          className="block mb-2"
        /> */}
        <input
          type="text"
          name="nombreFirma"
          placeholder="Escribe tu nombre"
          value={formData.nombreFirma}
          onChange={handleChange}
          className="w-full border p-2 rounded italic"
        />
      </div>

      {/* Submit */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Enviar formulario
        </button>
      </div>
    </form>
  );
}
