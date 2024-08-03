import React, { useEffect, useContext } from 'react'
import ReportList from '../components/ReportList.jsx'
import Navbar from '../components/Navbar'
import { Context } from '../js/store/appContext'
import './Main.css'

const Main = () => {

    const { actions } = useContext(Context)


    useEffect(() => {
        actions.getReportList()
    }, [actions])

    return (
        <div className='mainTotal'>
            <Navbar />
            {/* <ul className="list-group list-group-flush"> */}
            <div className="list-group">
            {
                <ReportList/>
            }

            {/* </ul> */}
            </div>
        </div>
    )
}

export default Main
