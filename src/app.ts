import express from 'express';
import cors from 'cors'
import routerIndex from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// ==============================
// Cors
const allowedOrigins = ['http://localhost:3000']
const options: cors.CorsOptions = {
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: allowedOrigins,
    allowedHeaders: [
        'Content-Type',
    ]
};
app.use(cors(options));
// ==============================

app.use('/', routerIndex)

export default app;