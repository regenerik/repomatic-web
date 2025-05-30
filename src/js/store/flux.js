const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listaForms: [],
            users: [],
            userForEdit: null,
            registerOk: true,
            reportes_disponibles: [],
            reportes_no_disponibles: [],
            reportes_acumulados: [],
            userName: "",
            user: { username: "", dni: "", admin: "", email: "", url_image: "" },
            trigger: false,
            deleteAndRefresh: false
        },
        actions: {
            checkToken: async () => {
                try {
                    const response = await fetch('https://repomatic.onrender.com/check-token', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    return response.ok;
                } catch (error) {
                    console.error('Error al validar token:', error);
                    return false;
                }
            },
            deleteFormById: async (id) => {
                try {
                    const response = await fetch("https://repomatic.onrender.com/delete_especific_form", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': '1803-1989-1803-1989'
                        },
                        body: JSON.stringify({ id })
                    });

                    if (!response.ok) {
                        throw new Error("No se pudo eliminar el formulario. El servidor respondió mal.");
                    }

                    // Eliminar del store si salió todo bien
                    const store = getStore();
                    const nuevaLista = store.listaForms.filter(form => form.id !== id);
                    setStore({ ...store, listaForms: nuevaLista });

                } catch (error) {
                    console.error("Error al eliminar el formulario:", error.message);
                }
            },
            getAllForms: async () => {
                try {
                    const res = await fetch(
                        'https://repomatic.onrender.com/form_gestores/download_excel',
                        {
                            method: 'GET',
                            headers: {
                                'Authorization': '1803-1989-1803-1989'
                            }
                        }
                    );
                    if (!res.ok) throw new Error('Error downloading Excel');
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    // El backend ya manda el nombre dinámico: usemos uno genérico
                    a.download = `Formularios_Gestores.xlsx`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                } catch (e) {
                    console.error('getAllForms error:', e);
                }
            },
            getForms: async () => {
                try {
                    const response = await fetch(
                        'https://repomatic.onrender.com/get_forms',
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': '1803-1989-1803-1989'
                            }
                        }
                    );
                    if (!response.ok) throw new Error('Error fetching forms');
                    let data = await response.json()
                    let store = getStore()
                    setStore({ ...store, listaForms: data })
                    // return await response.json();  // -> array de FormularioGestor
                } catch (e) {
                    console.error('getForms error:', e);
                }
            },

            downloadForm: async (id) => {
                try {
                    const response = await fetch(
                        `https://repomatic.onrender.com/get_form_pdf/${id}`,
                        {
                            method: 'GET',
                            headers: {
                                'Authorization': '1803-1989-1803-1989'
                            }
                        }
                    );
                    if (!response.ok) throw new Error('Error downloading PDF');
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `informe_${id}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                } catch (e) {
                    console.error('downloadForm error:', e);
                }
            },
            sendForm: async (formData) => {
                try {
                    const response = await fetch('https://repomatic.onrender.com/form_gestores', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '1803-1989-1803-1989'
                        },
                        body: JSON.stringify(formData)
                    });
                    return response.ok;
                } catch (error) {
                    console.error('Error enviando formulario:', error);
                    return false;
                }
            },
            sendMessage: async (data) => {
                try {
                    const response = await fetch('https://repomatic2.onrender.com/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '1803-1989-1803-1989'
                        },
                        body: JSON.stringify(data)
                    });

                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la red.');
                    }
                    return await response.json();
                } catch (error) {
                    console.error('Error en sendMessage:', error);
                    throw error;
                }
            },
            sendMessageMentor: async (data) => {
                try {
                    console.log("Entramos en el action sendMessageMentor con esta data: ", data)
                    const response = await fetch('https://repomatic2.onrender.com/chat_mentor', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '1803-1989-1803-1989'
                        },
                        body: JSON.stringify(data)
                    });
                    console.log("El response es: ",response)
                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la red.');
                    }
                    let datas = await response.json()
                    return datas

                } catch (error) {
                    console.error('Error en sendMessageMentor:', error);
                    throw error;
                }
            },

            closeChat: async (threadId) => {
                try {
                    const response = await fetch('https://repomatic2.onrender.com/close_chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '1803-1989-1803-1989'
                        },
                        body: JSON.stringify({ thread_id: threadId })
                    });

                    if (!response.ok) {
                        throw new Error('Error cerrando el chat.');
                    }
                    return await response.json();
                } catch (error) {
                    console.error('Error en closeChat:', error);
                }
            },
            closeChatMentor: async (threadId) => {
                try {
                    const response = await fetch('https://repomatic2.onrender.com/close_chat_mentor', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '1803-1989-1803-1989'
                        },
                        body: JSON.stringify({ thread_id: threadId })
                    });

                    if (!response.ok) {
                        throw new Error('Error cerrando el chat mentor.');
                    }
                    return await response.json();
                } catch (error) {
                    console.error('Error en closeChat:', error);
                }
            },
            deleteIndividualReport: async (id) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    let response = await fetch(`https://repomatic2.onrender.com/delete_individual_report/${id}`, {
                        method: "DELETE",
                        headers: {
                            'Authorization': apiKey
                        }
                    })
                    if (!response.ok) {
                        return false
                    } else {
                        return true
                    }

                } catch (error) {
                    console.error(error)
                    return false
                }
            },

            deleteReportGroup: async (url) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    let response = await fetch('https://repomatic2.onrender.com/delete_report_group', {
                        method: "DELETE",
                        body: JSON.stringify({ 'report_url': url }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': apiKey
                        }
                    })
                    if (!response.ok) {
                        return false
                    } else {
                        return true
                    }

                } catch (error) {
                    console.error(error)
                    return false
                }
            },
            callRefreshReportList: () => {
                let store = getStore()
                setStore({ ...store, deleteAndRefresh: !store.deleteAndRefresh })
            },
            toggleAdmin: async (email, admin) => {
                console.log("entro en toggleadmin")
                let payload = {
                    email: email,
                    admin: admin
                }
                console.log("payload preparado: ", payload)
                try {
                    let response = await fetch("https://repomatic2.onrender.com/update_admin", {
                        body: JSON.stringify(payload),
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    let data = await response.json()
                    console.log("data: ", data)
                    if (data.message) {
                        console.log("Admin updated")
                        let currentTrigger = getStore().trigger
                        setStore({ ...getStore(), trigger: !currentTrigger })
                        return data
                    } else {
                        console.log("algo salio mal actualizando el estado de admin")
                    }

                } catch (e) {
                    console.error(e)
                }
            },
            getUsers: async () => {
                console.log("getUsers ejecutándose...");
                let token = localStorage.getItem('token');


                if (!token) {
                    console.error("El token es undefined. Asegurate de que esté guardado correctamente.");
                    return;
                }

                let response = await fetch("https://repomatic2.onrender.com/users", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                let data = await response.json();
                if (data.lista_usuarios) {
                    setStore({ ...getStore(), users: data.lista_usuarios });
                }
            },
            setUserForEdit: (user) => {
                setStore({ ...getStore(), userForEdit: user });
            },
            deleteUser: (userId) => {
                const store = getStore();
                setStore({ ...getStore(), users: store.users.filter((user) => user.id !== userId) });
            },
            updateReport: async (payload) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('https://repomatic2.onrender.com/recuperar_reporte', {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': apiKey
                        }
                    })

                    let data = await response.json()

                    if (data.message) {
                        return true
                    } else {
                        return false
                    }

                } catch (e) {
                    console.error(e)
                    return false
                }
            },
            goToRegister: () => {
                let store = getStore()
                setStore({ ...store, registerOk: false })
                return
            },
            goToLogin: () => {
                let store = getStore()
                setStore({ ...store, registerOk: true })
                return
            },

            exampleFunction: () => {
                console.log("hola")
                return
            },
            login: async (info) => {
                try {
                    let response = await fetch("https://repomatic2.onrender.com/login", {
                        method: 'POST',
                        body: JSON.stringify(info),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();

                    if (!data.access_token) {
                        throw new Error("La pifiaste con las credenciales. ", " Aca la data:", data);
                    }


                    // Guardar token en localStorage
                    localStorage.setItem('token', data.access_token);

                    // Guardar otros datos
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('admin', JSON.stringify(data.admin));
                    localStorage.setItem('dni', data.dni);
                    localStorage.setItem('url_image', data.url_image);
                    localStorage.setItem('email', data.email);

                    // Guardar en el estado global
                    setStore({
                        ...getStore(),
                        userName: data.name,
                        token: data.access_token,
                        user: {
                            username: data.name,
                            dni: data.dni,
                            admin: data.admin,
                            email: data.email,
                            url_image: data.url_image
                        }
                    });


                } catch (e) {
                    console.error(e);
                }
            },
            register: async (info) => {
                try {

                    let response = await fetch('https://repomatic2.onrender.com/create_user', {
                        method: "POST",
                        body: JSON.stringify(info),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })

                    let data = await response.json();
                    console.log("respuesta de intento de registro: ", data)
                    if (!data.message && data.error) {
                        setStore({ ...getStore(), registerOk: false })
                        alert(data.error)
                        return false
                    } else {
                        setStore({ ...getStore(), registerOk: true })
                        return true
                    }


                } catch (e) {
                    console.log(`Error al registrar el usuario ${e}`)
                }
            },
            wrongPass: (booleano) => {
                const store = getStore()
                setStore({ ...store, wrongPass: booleano })
            },
            logout: () => {
                const store = getStore()
                setStore({ ...store, token: "", userName: "" })
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('admin');
            },
            getReportList: async () => {
                try {
                    const apiKey = process.env.REACT_APP_API_KEY
                    const result = await fetch('https://repomatic2.onrender.com/reportes_acumulados', {
                        headers: {
                            'Authorization': apiKey
                        }
                    });
                    const data = await result.json();
                    // Guardamos la data tal cual en el store
                    setStore({ ...getStore(), reportes_acumulados: data });
                } catch (e) {
                    console.error("Error al obtener los reportes acumulados:", e);
                }
            },
            uploadImageToCloudinary: async (imageFile) => {

                const preset_name = "j9z88xqz";
                const cloud_name = "drlqmol4c"

                const data = new FormData();
                data.append('file', imageFile);
                data.append('upload_preset', preset_name);

                try {
                    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                        method: 'POST',
                        body: data
                    });

                    if (!response.ok) {
                        throw new Error('Failed to upload image');
                    }

                    const file = await response.json();
                    const originalUrl = file.secure_url;

                    console.log("Original URL: ", originalUrl); // Verificar la URL original

                    return originalUrl;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return null;
                }
            },
            downloadReport: async (report_id) => {
                const apiKey = process.env.REACT_APP_API_KEY;
                try {
                    const response = await fetch(`https://repomatic2.onrender.com/descargar_reporte/${report_id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": apiKey
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`Error al descargar el reporte: ${response.status} ${response.statusText}`);
                    }

                    const blob = await response.blob();

                    // Intentamos extraer el nombre del archivo desde el header Content-Disposition
                    let fileName = `reporte_${report_id}.csv`;
                    const disposition = response.headers.get("Content-Disposition");
                    if (disposition && disposition.indexOf("filename=") !== -1) {
                        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        const matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) {
                            fileName = matches[1].replace(/['"]/g, '');
                        }
                    }

                    const downloadUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(downloadUrl);
                    document.body.removeChild(a);
                } catch (e) {
                    console.error("Error al descargar el reporte:", e);
                }
            },
            uploadFile: async (formData) => {
                try {
                    // Hacemos el fetch a la URL del backend
                    let response = await fetch("https://repomatic.onrender.com/create_resumes", {
                        method: 'POST',
                        body: formData, // Asegurarse de que el archivo se esté enviando correctamente
                    });

                    // Verificamos que la respuesta sea OK
                    if (!response.ok) {
                        throw new Error('Error en la subida del archivo');
                    }

                    // Convertimos la respuesta a un Blob (porque es un archivo binario)
                    const blob = await response.blob();
                    console.log('Archivo subido con éxito y recibido como blob.');

                    return blob; // Devolvemos el blob al componente para que lo use en la descarga
                } catch (error) {
                    console.error('Error al subir el archivo:', error);
                    throw error;
                }
            },
            uploadExcel: async (formData) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('https://repomatic.onrender.com/subir_excel_total', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Authorization": apiKey
                        }
                    });
                    return response;
                } catch (error) {
                    console.error('Error al subir el archivo:', error);
                    throw error;
                }
            },

            // Action para descargar el Excel
            downloadExcel: async () => {

                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('http://localhost:5000/descargar_excel', {
                        method: 'GET',
                        headers: {
                            "Authorization": apiKey,
                        }
                    });
                    console.log("Este es el response: ", response)
                    if (!response.ok) {
                        throw new Error('Error al descargar el archivo');
                    }

                    const blob = await response.blob();  // Para crear la descarga del archivo
                    return blob;
                } catch (error) {
                    console.error('Error al descargar el archivo:', error);
                    throw error;
                }
            },

            // Action para eliminar el Excel
            deleteExcel: async () => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('https://repomatic.onrender.com/eliminar_excel_total', {
                        method: 'DELETE',
                        headers: {
                            "Authorization": apiKey
                        }
                    });
                    console.log("este es el response de eliminar: ", response)
                    return response;
                } catch (error) {
                    console.error('Error al eliminar el archivo:', error);
                    throw error;
                }
            },
            existencia: async () => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {
                    const response = await fetch('https://repomatic.onrender.com/existencia_excel', {
                        headers: {
                            "Authorization": apiKey
                        }
                    })
                    const data = await response.json()
                    console.log("la data del action existencia es esta: ", data)
                    if (data.ok) {
                        return data.datetime
                    } else {
                        return false
                    }



                } catch (e) {
                    console.error(e)
                }
            },
            getOneResume: async (apies) => {
                const apiKey = process.env.REACT_APP_API_KEY
                try {

                    const response = await fetch('https://repomatic.onrender.com/get_one_resume', {
                        method: 'POST',
                        headers: {
                            'Authorization': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ apies }), // Enviamos el número de APIES
                    });
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `resumen_estacion_${apies}.xlsx`);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    } else {
                        throw new Error('Error al descargar el archivo');
                    }
                } catch (error) {
                    console.error('Error fetching resumen:', error);
                    throw error;
                }
            }

        }
    };
};

export default getState;