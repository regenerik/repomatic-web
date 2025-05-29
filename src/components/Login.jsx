import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../js/store/appContext.js';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import gifLoading from '../img/Loading_2.gif';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    if (rememberMe) {
      localStorage.setItem('inputEmail', text);
    } else {
      localStorage.removeItem('inputEmail');
    }
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    // Si se desactiva el checkbox, borrar el email del localStorage
    if (!isChecked) {
      localStorage.removeItem('inputEmail');
    } else {
      // Si se activa, guardar el email actual
      localStorage.setItem('inputEmail', email);
    }
  };

  const handlerSetPass = (text) => {
    setPass(text);
    actions.wrongPass(false);
  };

  useEffect(() => {
    // Leer el email del localStorage cuando carga la página
    const savedEmail = localStorage.getItem('inputEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);  // Marcar el checkbox si hay un email guardado
    }
  }, []);

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
            type='email'
            placeholder='E-mail'
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
            <input type='checkbox'
              checked={rememberMe}
              onChange={handleRememberMeChange} />
            Recordame
          </label>
          <p>Olvidaste tu contraseña?</p>
        </div>
        <button type='submit'>{isLoading ? (
          <img
            src={gifLoading}
            alt='gift de carga'
            style={{ width: '30vh', height: '5vh' }}
          />
        ) : (<h5>Login</h5>)}</button>

        {/* <div className='register-link'>
          <p>No tienes cuenta? <span onClick={() => navigate('/loginregister')} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Registrate acá</span></p>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
