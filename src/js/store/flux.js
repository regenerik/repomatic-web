const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            users: [],
            userForEdit: null,
            registerOk: true,
            reportes_disponibles: [],
            reportes_no_disponibles: [],
            userName: "",
            user:{username:"", dni:"", admin:"", email:"", url_image:""},
            trigger: false
        },
        actions: {
            toggleAdmin: async (email, admin) => {
                console.log("entro en toggleadmin")
                let payload ={
                    email:email,
                    admin:admin
                }
                console.log("payload preparado: ",payload)
                try{
                    let response = await fetch("https://repomatic.onrender.com/update_admin",{
                        body: JSON.stringify(payload),
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    let data = await response.json()
                    console.log("data: ", data)
                    if(data.message){
                        console.log("Admin updated")
                        let currentTrigger = getStore().trigger
                        setStore({...getStore(),trigger: !currentTrigger })
                        return data
                    }else{
                        console.log("algo salio mal actualizando el estado de admin")
                    }

                }catch(e){
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
            
                let response = await fetch("https://repomatic.onrender.com/users", {
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
                setStore({...getStore(), userForEdit: user });
            },
            deleteUser: (userId) => {
                const store = getStore();
                setStore({...getStore(), users: store.users.filter((user) => user.id !== userId) });
            },
            updateReport: async (payload) => {

                try {
                    const response = await fetch('https://repomatic.onrender.com/recuperar_reporte', {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '1803-1989-1803-1989'
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
                    let response = await fetch("https://repomatic.onrender.com/login", {
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

                    let response = await fetch('https://repomatic.onrender.com/create_user', {
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
                    const result = await fetch('https://repomatic.onrender.com/reportes_disponibles')
                    const data = await result.json()
                    setStore({ ...getStore(), reportes_disponibles: data.lista_reportes_disponibles, reportes_no_disponibles:data.lista_reportes_no_disponibles })
                } catch (e) {
                    console.error(e)
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
            downloadReport: async(url, type) => {
                try {
                    let response = await fetch("https://repomatic.onrender.com/obtener_reporte", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `1803-1989-1803-1989`
                        },
                        body: JSON.stringify({ "reporte_url": url, "file_type": type })
                    });
            
                    if (!response.ok) {
                        throw new Error(`Error al descargar el reporte: ${response.status} ${response.statusText}`);
                    }
            
                    let blob = await response.blob();
            
                    // Obtener la parte significativa de la URL y generar el nombre del archivo
                    const formattedUrl = url.split('?')[1].slice(0, 15); // Tomamos los primeros 15 caracteres de la URL después del '?'
                    let fileName = `${formattedUrl}.${type}`; // Nombre del archivo: parte de la URL + tipo de archivo
            
                    let downloadUrl = window.URL.createObjectURL(blob);
            
                    let a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = fileName; // Descargar el archivo con el nombre generado
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
            }
             
        }
    };
};

export default getState;