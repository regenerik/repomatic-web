import React, { useContext, useEffect } from 'react';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router-dom';
import './Usuarios.css';

const Usuarios = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleEdit = (user) => {
    actions.setUserForEdit(user); // Acción que guarda el usuario en el estado global
    navigate('/editar-usuario');  // Navegar al componente de edición
  };

  const handleDelete = (user) => {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.name}? Esta acción no se puede deshacer.`);
    if (confirmed) {
      actions.deleteUser(user.id); // Acción para eliminar el usuario
    }
  };

  const handleAdminToggle = (user) => {
    const message = user.admin ? 'quitarle' : 'darle';
    const confirmed = window.confirm(`¿Estás seguro de que deseas ${message} acceso de administrador a ${user.name}?`);
    if (confirmed) {
      actions.toggleAdmin(user.id); // Acción para cambiar el estado de admin del usuario
    }
  };

  useEffect(()=>{
    actions.getUsers(); // Acción para obtener los usuarios
  },[])

  return (
    <div className="usuarios-container">
      {store.users.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <div className="usuarios-list">
          {store.users.map((user) => (
            <div key={user.dni} className="usuario-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>DNI: {user.dni}</p>
              <div className="botones-container">
                <button className="btn editar" onClick={() => handleEdit(user)}>Editar</button>
                <button className="btn eliminar" onClick={() => handleDelete(user)}>Eliminar</button>
                <button 
                  className={`btn admin ${user.admin ? 'admin-activo' : 'admin-inactivo'}`} 
                  onClick={() => handleAdminToggle(user)}>
                  {user.admin ? 'Admin' : 'No Admin'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Usuarios;
