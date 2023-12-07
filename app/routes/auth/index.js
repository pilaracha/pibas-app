const auth = require('express').Router();

const login = require('./login');
const logout = require('./logout');
const user = require('./user');


/**
 * @api {post} /auth/login Get access token
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} id_token of the user.
 *
 * @apiSuccess {String} access_token Access token.
 */
auth.post('/login', login);
auth.post('/logout', logout);
auth.get('/user', user);


module.exports = auth;
