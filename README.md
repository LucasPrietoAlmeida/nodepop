# Nodepop

**Nodepop** es una aplicación web desarrollada con **Node.js, Express, EJS y MongoDB (Mongoose)** como parte del módulo de Backend del Bootcamp de KeepCoding.

Permite la gestión de productos de un marketplace interno, con autenticación de usuarios, filtros, creación y eliminación de productos, y renderizado del contenido en servidor (SSR).

---

## Instalación y ejecución

### 1 Clonar el repositorio

```bash
git clone https://github.com/tuusuario/nodepop.git
cd nodepop
```

### 2 Instalar dependencias
```bash
    npm install
```

### 3 Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
```ini
MONGODB_URI=mongodb://127.0.0.1:27017/nodepop
SESSION_SECRET=un_string_seguro
```

### 4 Inicializar base de datos con datos de ejemplo
```bash
npm run initDB
```
Esto eliminará todos los productos existentes y cargará varios productos de ejemplo asociados al usuario test@nodepop.com y lucas@nodepop.com.

### 5 Crear usuario de prueba

Si no lo tienes en tu base de datos, puedes generarlo con:
```bash
node scripts/createUser.js
```

El script crea el usuario:
```yaml
email: test@nodepop.com
password: 1234
```
### 6 Ejecutar la aplicación
```bash
npm start
```

La aplicación estará disponible en:
http://localhost:3000

### Funcionalidades
Autenticación

- Login / Logout con sesión persistente en MongoDB (gracias a connect-mongo).

- Las vistas muestran opciones según el estado del usuario (logueado o no).

Gestión de productos

- Listado de productos propios (cada usuario ve solo los suyos).

- Creación de nuevos productos mediante formulario.

- Eliminación de productos propios (confirmación visual antes de borrar).

Filtros y paginación

- Filtro por tag, rango de precio (min, max), y nombre (empieza por).

- Ordenación mediante parámetro sort.

- Paginación controlada con skip y limit.

- Todos los filtros se mantienen al cambiar de página.

### Estructura del proyecto
```bash
nodepop/
├── app.js                     
├── bin/www                    
├── lib/connectMongoose.js     
├── models/
│   ├── Product.js             
│   └── User.js                
├── routes/
│   ├── api/products.js        
│   └── auth.js                
├── middleware/auth.js         
├── views/
│   ├── index.ejs              
│   ├── login.ejs              
│   └── error.ejs                          
├── public/
│   ├── stylesheets/style.css  
│   └── images/ 
├── scripts/
│   └── createUser.js          
├── initDB.js                  
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

### Tecnologías utilizadas

- Node.js
- Express 5
- EJS (motor de plantillas)
- MongoDB + Mongoose
- express-session + connect-mongo
- dotenv, morgan, cookie-parser

### Usuario de prueba

**Email**	                **Contraseña**
```yaml
test@nodepop.com        1234
lucas@nodepop.com       lucas
```
