const express = require('express');
const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Métodos HTTP
 * 
 * GET: Consumir recursos
 * POST: Criar recursos
 * PUT: Alterar recursos
 * DELETE: Remover recursos
 * 
 */

/**
 * Tipos de Parâmetros:
 * 
 * Query params: parâmetros nomeados passados via URL após "?" (Normalmente utilizado em filtros e paginação) (OBS: requisições de método GET são limitados a 2,048 caracteres)
 * Route/Path Params: parâmetros que não identificáveis na rota que podem ser utilizados para identificar recursos ou afins
 * Request Body: Corpo da requisição, utilizado para criar (POST) ou atualizar algum recurso (PUT) 
 */

 
routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;