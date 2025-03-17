import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './modules/users/user_routes.js'; // Nota el .js al final
import forumRoutes from './modules/forum/forum_routes.js'; // Nota el .js al final
import subjectRoutes from './modules/subject/subject_routes.js'; // Nota el .js al final
import { corsHandler } from './middleware/corsHandler.js';
import { loggingHandler } from './middleware/loggingHandler.js';
import { routeNotFound } from './middleware/routeNotFound.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config(); // Cargamos las variables de entorno desde el archivo .env

const app = express();

const LOCAL_PORT = process.env.SERVER_PORT || 8000;

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios',
            version: '1.0.0',
            description: 'Documentación de la API de Usuarios'
        },
        tags: [
            {
              name: 'Users',
              description: 'Rutas relacionadas con la gestión de usuarios',
            },
            {
              name: 'Forum',
              description: 'Rutas relacionadas con el forum',
            },
            {
              name: 'Subject',
              description: 'Rutas relacionadas con las asignaturas',
            },
            {
              name: 'Main',
              description: 'Rutas principales de la API',
            }
          ],
        servers: [
            {
                url: `http://localhost:${LOCAL_PORT}`
            }
        ]
    },
    apis: ['./modules/users/*.js', './modules/forum/*.js', './modules/subject/*.js'] // Asegúrate de que esta ruta apunta a tus rutas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());
app.use(loggingHandler);
app.use(corsHandler);

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rutas
app.use('/api', userRoutes);
app.use('/api', forumRoutes);
app.use('/api', subjectRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

// Middleware para manejar rutas no encontradas
app.use(routeNotFound);

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb+srv://joan:1234@cluster0.3owhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.error('DB Connection Error:', error));

// Iniciar el servidor
app.listen(LOCAL_PORT, () => {
    console.log('Server listening on port: ' + LOCAL_PORT);
    console.log(`Swagger disponible a http://localhost:${LOCAL_PORT}/api-docs`);
});