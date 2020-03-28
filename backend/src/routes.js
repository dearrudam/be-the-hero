const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

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


routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    }),
}), SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(9).max(11).regex(/^[0-9]+$/),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page : Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}), IncidentController.create);

routes.delete('/incidents/:id',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),   
    })
}), IncidentController.delete);


module.exports = routes;