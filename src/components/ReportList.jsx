import React, { useContext } from 'react'
import { Context } from '../js/store/appContext'
import './ReportList.css'

const ReportList = () => {
    const { store } = useContext(Context)
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
                            <small><button type="button" className="btn btn-outline-light boton_actualizar">Actualizar</button></small>
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