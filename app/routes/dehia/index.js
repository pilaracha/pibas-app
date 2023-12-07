const dehia = require('express').Router();
const authMiddleware = require('../../middlewares/authMiddleware');

const activities = require('./activities');
const tasks = require('./tasks');
const results = require('./results');

dehia.use(authMiddleware);

/**
 * @api {get} /dehia/activities Get activities from user
 * @apiName GetActivities
 * @apiGroup Dehia
 *
 * @apiSuccess {Activities} [].
 */
 dehia.get('/activities', activities);


/**
 * @api {get} /dehia/tasks/:id_activitiy Get tasks from activity
 * @apiName GetTasks
 * @apiGroup Dehia
 *
 * @apiSuccess {Tasks} [].
 */
 dehia.get('/tasks/:id_activity', tasks);


 /**
 * @api {get} /dehia/results/:id_activitiy Get results from activity
 * @apiName GetResults
 * @apiGroup Dehia
 *
 * @apiSuccess {Results} [].
 */
  dehia.get('/results/:code', results);


module.exports = dehia;
