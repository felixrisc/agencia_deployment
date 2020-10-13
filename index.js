import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();


// conectar DB
db.authenticate()
    .then(()=>{console.log('BD conectada')})
    .catch(error => console.log(error))

// Definir puerto
const port = process.env.PORT || 3000;

// Definir host
const host = process.env.HOST || '0.0.0.0';

// Habilitar PUG
app.set('view engine','pug');

// Obtener el año actual
app.use((req,res,next)=>{
    const year = new Date();

    res.locals.fechaActual = year.getFullYear();
    res.locals.nombreSitio = "MagiTours";
    next();
});

// Agregar body parser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/',router);

app.listen(port,host,()=>{
    console.log(`El servidor esta funcionando en ${host} : ${port}`);
})