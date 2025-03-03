# AuthApp MEAN

### Requerimiento: 
 - El objetivo es desarrollar una aplicación basada en MEAN, que incluye MongoDB, Express, Angular y Node.js.

### Tecnologías utilizados
>- MongoDB
>- Express
>- Angular
>- NodeJs

#### Pasos Importantes y Recomendaciones:
1. Configuración del Backend:

  - En el archivo `.env`, que se encuentra en la raíz del proyecto del backend, asegúrate de realizar las siguientes configuraciones:
  
    - Reemplaza la variable `DB_CNN` con la cadena de conexión correcta para conectar tu proyecto con la base de datos MongoDB.
  
        Ejemplo: `mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombreBaseDeDatos`

    - Genera un `SECRET_KEY_JWT` único y seguro. Este es necesario para firmar los JSON Web Tokens (JWT) usados en el sistema de autenticación.

        Ejemplo: `SECRET_KEY_JWT=miClaveSecretaSuperSegura123`

2. Configuración del Frontend:

  - Dentro del proyecto frontend (Angular), ubica los archivos de configuración en la carpeta `environments`.

  - Reemplaza la clave `baseUrl` con la URL correspondiente al backend para garantizar que las peticiones funcionen correctamente.

      Ejemplo: Si tu backend está corriendo en un servidor local, puedes usar: `http://localhost:3000/api.`
    
<br/>

> [!NOTE]
> - Antes de lanzar la aplicación, revisa que todas las conexiones entre el frontend y el backend estén funcionando correctamente.
> - Asegúrate de que las variables de entorno estén configuradas y protegidas, evitando incluirlas en el control de versiones como GitHub.
