const pibas = require('express').Router();
const authMiddleware = require('../../middlewares/authMiddleware');

const home = require('./home');
const graphics = require('./graphics');
const dashboards = require('./dashboards');

pibas.use(authMiddleware);

pibas.get('/home', home.home);

pibas.get('/graficos', graphics.findAll);
pibas.get('/graficos/buscar', graphics.search);
pibas.get('/graficos/:id', graphics.findOne);
pibas.post('/graficos', graphics.save);
pibas.get('/graficos/actividad/:id', graphics.findByActivity);
pibas.put('/graficos/:id/favorito', graphics.markAsFavorite);
pibas.get('/graficos/user/favoritos', graphics.getFavoriteGraphics);
pibas.delete('/graficos/:id', graphics.delete);

pibas.get('/tableros', dashboards.findAll);
pibas.get('/tableros/:id', dashboards.findOne);
pibas.put('/tableros/:id', dashboards.updateDashboard);
pibas.post('/tableros', dashboards.save);
pibas.put('/tableros/:id/favorito', dashboards.markAsFavorite);
pibas.get('/tableros/user/favoritos', dashboards.getFavoriteDashboards);
pibas.delete('/tableros/:id', dashboards.delete);

module.exports = pibas;
