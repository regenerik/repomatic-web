import React, { useContext } from 'react';
import { Context } from '../js/store/appContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const { actions } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';


    const handlerLogOut = () => {
        actions.logout()
        navigate('/')

    }
    return (

        <nav className="container-fluid navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className='logo_and_title'>
                    <Link className={isActive('/')} to="/">Repomatic</Link>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={isActive('/')} to="/">Principal</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={isActive('/main')} to="/main">Reportes</Link>
                        </li>
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
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {name}
                                </a>

                                <ul className="dropdown-menu">
                                    <li><div className="dropdown-item" >Info</div></li>
                                    <li><div className="dropdown-item" >Configuración</div></li>
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