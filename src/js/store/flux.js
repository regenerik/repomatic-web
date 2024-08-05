const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            personas: ["Pedro", "Maria"],
            registerOk: true,
            reportes_disponibles: [],
            userName: ""
        },
        actions: {
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
            simplificado: async () => {
                try {
                    let payload = {
                        username: "34490395",
                        password: "mentira1",
                        url: "https://www.campuscomercialypf.com/totara/reportbuilder/report.php?id=133"
                    }
                    const response = await fetch('https://repomatic.onrender.com/recuperar_reporte', {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '1803-1989-1803-1989'
                        }
                    })


                    let data = await response.json()

                    alert(data)
                } catch (e) {
                    console.error(e)
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
                    })

                    const data = await response.json()

                    if (!data.access_token) {
                        throw new Error("La pifiaste con las credenciales. ", " Aca la data:", data)
                    }
                    console.log("Hola ", data.name)
                    const store = getStore()
                    setStore({ ...store, userName: data.name, token: data.access_token })
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('admin', data.admin);
                    localStorage.setItem('dni', data.dni);


                } catch (e) {
                    console.error(e)
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
            button1: async () => {
                try {
                    let response = await fetch('https://dm-ypf.onrender.com/')
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();


                } catch (e) {
                    console.error(e)
                }
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
                    setStore({ ...getStore(), reportes_disponibles: data.lista_reportes })
                } catch (e) {
                    console.error(e)
                }
            }
        }
    };
};

export default getState;