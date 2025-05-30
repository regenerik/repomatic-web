import React, { useState, useEffect, useContext, useRef } from 'react';
import { Context } from '../js/store/appContext.js';
import Navbar from '../components/Navbar.jsx';
import './DataMentor.css';

const DataMentor = () => {
    const { actions } = useContext(Context);
    const [messages, setMessages] = useState([]); // Array de { sender: 'user'|'bot', text: '...' }
    const [inputValue, setInputValue] = useState('');
    const [threadId, setThreadId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Función para scrollear siempre hasta el último mensaje
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Cuando el componente se desmonte, se cierra el thread
useEffect(() => {
  return () => {
    if (threadId) {
      try {
        actions.closeChatMentor(threadId);
      } catch (err) {
        console.error('Error cerrando el chat mentor al desmontar:', err);
      }
    }
  };
}, [actions, threadId]);

    // Función para enviar el mensaje
    const handleSend = async () => {
        console.log("Empezó el handleSend...")
        if (!inputValue.trim()) return;
        console.log("Continua post if !inputValue.trim()...")
        const userMessage = inputValue;
        // Agregar el mensaje del usuario a la conversación
        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInputValue('');
        console.log("Este es el mensaje enviandose: ",userMessage)
        // Preparar el body: si es el primer mensaje, no se manda thread_id
        let data = { prompt: userMessage };
        if (threadId) {
            data.thread_id = threadId;
        }

        // Activamos el loading (typing indicator)
        setIsLoading(true);

        try {
            // Llamamos a la acción que envía el mensaje al back
            console.log("Casi llamando al action acá...")
            const response = await actions.sendMessageMentor(data);
            setIsLoading(false);
            if (response && response.response) {
                // Agregamos el mensaje del bot a la conversación
                setMessages(prev => [...prev, { sender: 'bot', text: response.response }]);
                // Guardamos el thread_id cuando lo recibamos por primera vez
                if (response.thread_id && !threadId) {
                    setThreadId(response.thread_id);
                }
            }
        } catch (err) {
            setIsLoading(false);
            console.error('Error al enviar mensaje:', err);
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Error: No se pudo enviar el mensaje.' },
            ]);
        }
    };

    // Permitir el envío con la tecla Enter
    const handleKeyDown = event => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div>
            <Navbar />
            
            <div className="chat-container">
            <h3 className='d-flex justify-content-center'>Chat Data Mentor v.Pre-alpha</h3>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-message bot">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input-area">
                    <textarea
                        className="chat-input"
                        placeholder="Escribe tu mensaje..."
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="chat-send-button" onClick={handleSend}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataMentor;
