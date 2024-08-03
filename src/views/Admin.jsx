import React from 'react'

const Admin = () => {
    const admin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')
    return (
        <div>
            {
                admin && token ? (<div>
                    Admin
                </div>) : (<h2>Logueate con una cuenta administradora para ver este contenido</h2>)
            }
        </div>
    )
}

export default Admin