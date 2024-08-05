import React, { useContext, useState } from 'react'
import { Context } from '../js/store/appContext'
import './ReportList.css'
import gifLoading from "../img/Loading_2.gif";

const ReportList = () => {
    const { store, actions } = useContext(Context)
    const [ loadingIndex, setLoadingIndex ] = useState(null)
    let dni = localStorage.getItem('dni')

    const handlerUpdateReport = async (dni, report_url, index) => {
        setLoadingIndex(index);  // Seteamos el índice del ítem que está en loading
        const password = prompt("Necesitamos la contraseña que usas en el campus para rescatar el reporte ( recordá que no todas las contraseñas tienen acceso a todos los reportes ):");
        if (password) {
            const updatedPayload = { username: dni, password: password, url: report_url };
            try {
                const result = await actions.updateReport(updatedPayload);
                setLoadingIndex(null);  // Reseteamos el loading al terminar
                if (result) {
                    alert("El proceso de rescate comenzó. Tené en cuenta que, según cual sea el reporte, el rescate puede demorar.Cuando esté completa la actualización, será visible en esta lista");
                } else {
                    alert("Hubo un problema al iniciar el rescate. Podria ser el campus o algun error interno del servidor.");
                }
            } catch (e) {
                console.error("Algo salió mal al intentar despachar el action que pide el reporte...", e);
                setLoadingIndex(null);  // Reseteamos el loading en caso de error
            }
        } else {
            setLoadingIndex(null);  // Reseteamos el loading si el usuario cancela el prompt
        }
    };
    

    return (
        <div className='contenedor_report_list'>
            <h3 className='mb-4'>Reportes Disponibles</h3>

            {
                store.reportes_disponibles.map((item, index) => {
                    return (
                        <div key={index} className="list-group-item list-group-item-action active card" style={{ width: '80%' }} aria-current="true">
                        <div className="d-flex w-100 justify-content-between align-items-center">
                          <h5 className="mb-1 titulo_nombre">{item.title}</h5>
                          <div className='grupo_derecha'>
                            <small className='me-2'>{item.created_at}</small>
                            <small>
                            { loadingIndex === index ? (
                            <img
                                src={gifLoading}
                                alt='gift de carga'
                                style={{ width: '30vh', height: '5vh' }}
                            />
                            ) 
                            : 
                            (
                                <button type='submit' className="btn btn-outline-light boton_actualizar" onClick={()=>handlerUpdateReport(dni,item.report_url,index)}>Actualizar</button>
                            )
                            }
                                </small>
                          </div>

                        </div>
                        <p className="mb-1">`Tamaño en MB: {item.size_megabytes}`</p>
                        <small>{item.report_url}</small>
                      </div>
                    )
                })
            }
        </div>
    )
}   

export default ReportList
