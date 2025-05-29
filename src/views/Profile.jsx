import React from 'react';
import './Profile.css'
import Navbar from '../components/Navbar.jsx';

const Profile = () => {





    return (
        <div>
            <Navbar />
            <div className="container mt-3 profile-container" >
                <p style={{ marginLeft: '25px', marginTop: '15px', marginBottom: '20px' }}>
                    Próximamente podrás modificar tus datos...
                </p>

            </div>
        </div>
    )
}

export default Profile