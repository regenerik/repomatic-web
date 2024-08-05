import React, { useEffect, useContext } from 'react'
import { Context } from '../js/store/appContext'
import ReportList from '../components/ReportList.jsx'
import Navbar from '../components/Navbar'
import './Main.css'

const Main = () => {

    const { actions } = useContext(Context)
    const token = localStorage.getItem('token')

    useEffect(() => {
        actions.getReportList()
    }, [actions])

    return (
        <div className='mainTotal'>
            <Navbar />
            <div className="list-group">
                {
                    token ? (<ReportList />) : (<h3>Logueate para acceder a los reportes</h3>)
                }
            </div>
        </div>
    )
}

export default Main
