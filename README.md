# Nodepop

IP del Servidor online -> 44.206.105.77

Despliegue en servidor (AWS / producción)

1. Preparar la instancia

- Instancia EC2 con Ubuntu
- Abrir puertos en Security Group:
    - 22 (SSH)
    - 80 (HTTP)

---

2. Instalar dependencias en el servidor

```bash
sudo apt update
sudo apt install -y nginx git nodejs npm
```
Instalar PM2:

```bash
sudo npm install -g pm2
```

---

3. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/nodepop.git
cd nodepop
npm install
```

---

4. Configurar variables de entorno

Crear .env:
```bash
nano .env
```

Contenido:
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/nodepop
```

---

5. Inicializar base de datos

```bash
npm run initDB
```

---

6. Ejecutar la aplicación con PM2

```bash
pm2 start bin/www --name nodepop
pm2 save
pm2 startup
```

---

7. Configurar Nginx como proxy inverso

Archivo:
```bash
sudo nano /etc/nginx/sites-available/default
```

Ejemplo de configuración multi-dominio:
```Nginx
# React
server {
    listen 80;
    server_name react.local;

    root /var/www/react-app;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}

# Nodepop
server {
    listen 80;
    server_name nodepop.local;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Static files
server {
    listen 80;
    server_name static.local;

    location / {
        root /var/www/html;
        autoindex on;

        add_header X-Owner LucasPrietoAlmeida;
    }
}
```

Aplicar cambios:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

8. Configurar dominios locales (cliente)

En tu máquina local editar /etc/hosts o hosts en Windows:

```bash
44.206.105.77 react.local
44.206.105.77 nodepop.local
44.206.105.77 static.local
```

---

Acceso a la aplicación

Una vez configurado:

- http://react.local → Frontend React
- http://nodepop.local → Nodepop (Express + EJS)
- http://static.local → Archivos estáticos


---

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
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/nodepop
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
│   └── stylesheets/style.css  
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

```yaml
**Email**	            **Contraseña**
test@nodepop.com        1234
lucas@nodepop.com       1234
```
