import React, { useContext } from 'react';
import { Context } from '../js/store/appContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../img/apoyo_gestion_web.png'

const Navbar = () => {
    const { actions } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    const admin = JSON.parse(localStorage.getItem('admin'));
    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';


    const handlerLogOut = () => {
        actions.logout()
        navigate('/')

    }
    return (

        <nav className="container-fluid navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className='logo_and_title'>
                    <img className="logo" src={logo} alt="logo apoyo a la gestión" />
                    <Link className={isActive('/')} to="/"><h4 className='title_navbar'>Repomatic</h4></Link>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={isActive('/')} to="/">Principal</Link>
                        </li>
                        {
                            token && (
                                <li className="nav-item">
                                    <Link className={isActive('/chat')} to="/chat">Chat</Link>
                                </li>
                            )
                        }

                        <li className="nav-item">
                            <Link className={isActive('/chat')} to="/form-list">Form</Link>
                        </li>

                        {
                            token && (
                                <li className="nav-item">
                                    <Link className={isActive('/main')} to="/main">Reportes</Link>
                                </li>
                            )
                        }
                        {
                            token && (
                                <li className="nav-item">
                                    <Link className={isActive('/experience')} to="/experience">Experiencia</Link>
                                </li>
                            )
                        }
                        <li className="nav-item">
                            <Link className={isActive('/plus')} to="/plus">Saber más</Link>
                        </li>
                        {
                            !token && (
                                <li className="nav-item">
                                    <Link className={isActive('/loginregister')} to="/loginregister">Registrate</Link>
                                </li>
                            )
                        }
                        {token && (
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {name}
                                </div>

                                <ul className="dropdown-menu">
                                    {
                                        admin && <li><div className="dropdown-item" onClick={() => navigate("/admin")} >Admin</div></li>
                                    }
                                    <li><div className="dropdown-item" onClick={() => navigate("/profile")}>Perfil</div></li>
                                    <li><div className="dropdown-item" onClick={handlerLogOut}>Log-out</div></li>
                                </ul>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>


    );
}

export default Navbar;

// {store.userName && (
//     <li className="nav-item">
//         <Link className={isActive('/main')} to="/main">Panel</Link>
//     </li>
// )}