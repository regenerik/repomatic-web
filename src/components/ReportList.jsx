import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../js/store/appContext';
import './ReportList.css';
import gifLoading from "../img/Loading_2.gif";
import gifLoading2 from "../img/loading_4.gif";

const ReportList = () => {
    const { store, actions } = useContext(Context);
    const [loadingIndex, setLoadingIndex] = useState(null);
    let dni = localStorage.getItem('dni');

    useEffect(() => {
        // Llamar al action para obtener la lista de reportes disponibles y no disponibles
        actions.getReportList();
    }, [actions]);

    const handlerUpdateReport = async (dni, report_url, index) => {
        setLoadingIndex(index);  // Seteamos el índice del ítem que está en loading
        const password = prompt("Necesitamos la contraseña que usas en el campus para rescatar el reporte (recordá que no todas las contraseñas tienen acceso a todos los reportes):");
        if (password) {
            const updatedPayload = { username: dni, password: password, url: report_url };
            try {
                const result = await actions.updateReport(updatedPayload);
                setLoadingIndex(null);  // Reseteamos el loading al terminar
                if (result) {
                    alert("El proceso de rescate comenzó. Tené en cuenta que, según cual sea el reporte, el rescate puede demorar. Cuando esté completa la actualización, será visible en esta lista");
                } else {
                    alert("Hubo un problema al iniciar el rescate. Podría ser el campus o algún error interno del servidor.");
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
                store.reportes_disponibles.length > 0 ? (
                    store.reportes_disponibles.map((item, index) => {
                        const formattedTitle = item.title.replace(/\+/g, ' ');
                        const formattedSize = parseFloat(item.size_megabytes).toFixed(2);
                        const formattedUrl = item.report_url.split('?')[1];
                        return (
                            <div key={index} className="list-group-item list-group-item-action active card" style={{ width: '80%' }} aria-current="true">
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h5 className="mb-1 titulo_nombre">{formattedTitle}</h5>
                                    <div className='grupo_derecha'>
                                        <small className='me-2'>{item.created_at}</small>
                                        <small>
                                            {loadingIndex === index ? (
                                                <img
                                                    src={gifLoading}
                                                    alt='gif de carga'
                                                    style={{ width: '30vh', height: '5vh' }}
                                                />
                                            )
                                                :
                                                (
                                                    <button type='submit' className="btn btn-outline-light boton_actualizar" onClick={() => handlerUpdateReport(dni, item.report_url, index)}>Actualizar</button>
                                                )
                                            }
                                        </small>
                                    </div>
                                </div>
                                <p className="mb-1">Tamaño en MB: {formattedSize}</p>
                                <small><span>Final de url: </span>{formattedUrl}</small>
                            </div>
                        );
                    })
                ) : (<img src={gifLoading2} alt='Cargando...' style={{ width: '10vh', height: '10vh' }} />)
            }

            <h3 className='mb-4 mt-4'>Reportes No Disponibles</h3>

            {
                store.reportes_no_disponibles ? (
                    
                    store.reportes_no_disponibles.map((item, index) => {
                        const formattedTitle = item.title.replace(/\+/g, ' ');
                        const formattedUrl = item.report_url.split('?')[1];
                        return (
                            <div key={index} className="list-group-item list-group-item-action card" style={{ width: '80%', backgroundColor: 'gray' }} aria-current="true">
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h5 className="mb-1 titulo_nombre">{formattedTitle}</h5>
                                    <div className='grupo_derecha'>
                                        <small>
                                            {loadingIndex === index + store.reportes_disponibles.length ? (
                                                <img
                                                    src={gifLoading}
                                                    alt='gif de carga'
                                                    style={{ width: '30vh', height: '5vh' }}
                                                />
                                            )
                                                :
                                                (
                                                    <button type='submit' className="btn btn-outline-light boton_actualizar" onClick={() => handlerUpdateReport(dni, item.report_url, index + store.reportes_disponibles.length)}>Recuperar</button>
                                                )
                                            }
                                        </small>
                                    </div>
                                </div>
                                <small><span>Final de url: </span>{formattedUrl}</small>
                            </div>
                        );
                    })
                ) : (<img src={gifLoading2} alt='Cargando...' style={{ width: '10vh', height: '10vh' }} />)
            }

        </div>
    );
}

export default ReportList;
