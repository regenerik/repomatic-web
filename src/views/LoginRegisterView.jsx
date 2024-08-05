import React from 'react'
import './LoginRegisterView.css'
import Register from '../components/Register.jsx'

import Navbar from '../components/Navbar.jsx'

const LoginRegisterView = () => {

 const token = localStorage.getItem('token')

  return (
    <div className='login_register_general d-flex flex-column align-items-center'>
            <Navbar />
        {
            token ? ( <h3>Para registrarte primero hay que desloguearse</h3> ) : ( <Register /> )
        }

    </div>
  )
}

export default LoginRegisterView