import React, { useContext } from 'react'
import Navbar from '../components/Navbar.jsx'
import './Home.css'
import Login from '../components/Login.jsx'
import { Context } from '../js/store/appContext.js'

const Home = () => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    const { store } = useContext(Context)

    return (
        <div className='home_general d-flex flex-column align-items-center'>
            <Navbar />
            <h1 className='titulo'>Bienvenido a Repomatic {name}</h1>
            {
                token ? (
                    <h1>contenido acá</h1>
                ) : (<Login />)
            }


        </div>
    )
}

export default Home