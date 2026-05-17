# API REST Files

API REST desarrollada con Node.js, Express, MongoDB y Cloudinary para la gestión de películas y directores.

Permite realizar operaciones CRUD completas, gestionar relaciones entre colecciones y subir imágenes a Cloudinary utilizando Multer.

---

# Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Cloudinary
- Multer
- Dotenv
- Nodemon

---

# Estructura del proyecto

# Estructura del proyecto

```bash
src/
├── api/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── config/
└── middlewares/
```

# Modelos

## Movie

```js
{
  title: String,
  year: Number,
  img: String
}
```

## Director

```js
{
  name: String,
  country: String,
  img: String,
  movies: [ObjectId]
}
```

# Relaciones

- Director → Movies

Se utiliza populate() para obtener la información completa de las películas relacionadas.

---

# Endpoints

## Movies

| Método | Endpoint           | Descripción             |
| ------ | ------------------ | ----------------------- |
| GET    | /api/v1/movies     | Obtener películas       |
| GET    | /api/v1/movies/:id | Obtener película por ID |
| POST   | /api/v1/movies     | Crear película          |
| PUT    | /api/v1/movies/:id | Actualizar película     |
| DELETE | /api/v1/movies/:id | Eliminar película       |

## Directors

| Método | Endpoint              | Descripción             |
| ------ | --------------------- | ----------------------- |
| GET    | /api/v1/directors     | Obtener directores      |
| GET    | /api/v1/directors/:id | Obtener director por ID |
| POST   | /api/v1/directors     | Crear director          |
| PUT    | /api/v1/directors/:id | Actualizar director     |
| DELETE | /api/v1/directors/:id | Eliminar director       |

# Subida de imágenes

Las imágenes se suben mediante multipart/form-data usando el campo:

img

Las imágenes se almacenan en Cloudinary.

---

# Variables de entorno

# Variables de entorno

Crear un archivo `.env` con la siguiente estructura:

```env
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
CLOUD_NAME=nombre_cloudinary
API_KEY=123456789012345
API_SECRET=abcdefghijklmnopqrstuvwxyz
CLOUDINARY_FOLDER=api-rest-files
```

# Scripts

## Ejecutar servidor

npm run dev

## Ejecutar seed

npm run seed

---

# Funcionalidades

- CRUD completo de Movies
- CRUD completo de Directors
- Relaciones entre colecciones
- Populate con Mongoose
- Subida de imágenes a Cloudinary
- Eliminación sincronizada de imágenes en Cloudinary
- Seed de datos
- Arquitectura modular
- Variables de entorno protegidas

---

# Autor

Guillem Pani
