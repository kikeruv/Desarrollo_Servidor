# Clase:
Es todo lo que hemos visto en las diferentes clases que llevamos 
# Tarea 1:

# Tarea 2
La creación de la tarea se encuentra en el **index** de la carpeta **Clase** y en el archivo **chat.handlebars**.
Dentro del archivo **chat.handlebars** se encuentran los estilos y los diferentes scripts para que funcione lo que se pide en la tarea.
Para la revisión de esta tarea, se recomienda ingresar directamente a: **http://localhost:3001/chat**

# Tarea 3 Pruebas Unitarias: (Class Activite)
#### Ejercicio 1
Archivo `utils.js` con las funciones:
- `suma(a, b)`
- `resta(a, b)`
- `multiplica(a, b)`
- `divide(a, b)` → lanza error si se divide entre 0 

Se prueban con **Jest** en `utils.test.js`.

#### Ejercicio 2
Servidor con **Express** en `index.js` con un endpoint:
GET /test → { mensaje: "ok" }  
Se valida con **Supertest** que devuelva status **200** y el contenido correcto.  
Las pruebas están en `ejercicio_2/index.test.js`.

#### Ejercicio 3
Middleware `auth.js` que valida un token **JWT** enviado en el header:
Authorization: Bearer <token>  
Y un endpoint protegido:
GET /admin → { mensaje: "ok" }  (si el token es válido)  
También se prueba que:
- Devuelva **401** si no hay token o es inválido  
- Devuelva **200** si el token es válido  
- Se llame `next()` correctamente en el middleware  
Las pruebas están en `authMiddleware.test.js`.

### Cómo correr el proyecto
1. Instalar dependencias:
   npm install  
2. Ejecutar todas las pruebas:
   npm test  
3. Levantar el servidor manualmente (opcional):
   npm start  
   Por defecto corre en el puerto **3000** y sirve para probar `/test` y `/admin` manualmente.

# Tarea 4 Mini Chat en tiempo real:
Este proyecto es una aplicación sencilla de chat en tiempo real que permite a varios usuarios conectarse, 
enviar mensajes y ver cuándo otros usuarios se unen al chat.

Cuenta con un pequeño detalle que no logré resolver:  
al presionar el botón **"Enviar"**, se debe hacer clic dos veces para que el mensaje se muestre en el propio chat, mientras que en el otro usuario aparece con un solo clic (y viceversa).

## Cómo ejecutar
### Servidor (backend)
1. Ir a la carpeta del servidor.  
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor:
   ```bash
   npm run dev
   ```
4. El servidor se ejecuta en  
   **http://localhost:3000**

---

### Cliente (frontend Angular)
1. Ir a la carpeta del proyecto Angular.  
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar la aplicación:
   ```bash
   ng serve
   ```
4. Abrir en el navegador:  
   **http://localhost:4200**

---
