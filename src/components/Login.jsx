import React, { useState, useContext } from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router-dom';
import gifLoading from '../img/Loading_2.gif';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { store, actions } = useContext(Context);

  const handlerLogin = async () => {
    try {
      setIsLoading(true);
      const info = {
        email: email,
        password: pass,
      };
      await actions.login(info);
      if (store.userName !== '' && store.userName !== undefined) {
        actions.wrongPass(false);
        navigate('/main');
      } else {
        actions.wrongPass(true);
        setEmail('');
        setPass('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerSetEmail = (text) => {
    setEmail(text);
    actions.wrongPass(false);
  };

  const handlerSetPass = (text) => {
    setPass(text);
    actions.wrongPass(false);
  };

  const handlerToRegister = () => {
    actions.goToRegister();
  };

  return (
    <div className='wrapper d-flex justify-content-center'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlerLogin();
        }}
      >
        <h1>Login</h1>
        <div className='input-box'>
          <input
            type='text'
            placeholder='Usuario'
            id='email'
            value={email}
            onChange={(e) => handlerSetEmail(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Contraseña'
            id='password'
            value={pass}
            onChange={(e) => handlerSetPass(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>
        {store.wrongPass && (
          <p style={{ color: 'white', fontSize: '18px' }}>Credencial/es incorrecta/s</p>
        )}
        <div className='remember-forgot'>
          <label>
            <input type='checkbox' />
            Recordame
          </label>
          <p>Olvidaste tu contraseña?</p>
        </div>
        <button type='submit'>{ isLoading ? (
          <img
            src={gifLoading}
            alt='gift de carga'
            style={{ width: '30vh', height: '5vh' }}
          />
        ) : (<h5>Login</h5>)}</button>

        <div className='register-link'>
          <p onClick={handlerToRegister}>No tienes cuenta? Registrate acá</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
