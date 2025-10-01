import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import swaggersJsDoc from 'swagger-jsdoc';
import { setup, serve } from 'swagger-ui-express';
import  SwaggerOptions  from './../swagger.config';
import { dbConnect } from './database';
import routes from './app/routes';

const port = process.env.PORT || 3000;

const app = express;

app.use(routes);

app.get('', (req, res) => {
    res.send('api works')
});

const swaggerDocs = swaggersJsDoc(SwaggerOptions);

app.use('/swagger', serve, setup(swaggerDocs));

// Conectar a mongo
dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`app is running in port ${port}`)
    })
}).catch(() => {
    console.log(`Failed to connect to the database`)
})
// Corremos la API
app.listen( port, () =>{
    console.log('app is running in port ${port}')
});
