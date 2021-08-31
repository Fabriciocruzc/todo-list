const express = require('express');

const usuarioControllers = require('./controllers/usuarioControllers');
const tarefasControllers = require('./controllers/tarefasControllers');
const profileControllers = require('./controllers/profileControllers');
const sessionControllers = require('./controllers/sessionControllers');


const routes = express.Router();

routes.post('/session', sessionControllers.create);

routes.get('/usuario', usuarioControllers.index);
routes.post('/usuario', usuarioControllers.create);

routes.get('/profile', profileControllers.index); 

routes.get('/tarefas', tarefasControllers.index);
routes.post('/tarefas', tarefasControllers.create);
routes.put('/tarefas/:id', tarefasControllers.update);
routes.delete('/tarefas/:id', tarefasControllers.delete);

 module.exports = routes;