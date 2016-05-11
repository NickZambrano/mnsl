var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var members = require('./members.js');
var dip = require('./dip.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/signin', auth.signin);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/members', members.getAll);
router.get('/api/members/:id', members.getOne);
router.get('/api/myProfile', members.getMy);
router.post('/api/members', members.create);
router.put('/api/members/:id', members.update);
router.delete('/api/members/:id', members.delete);


router.post('/api/dip/addDip', dip.create);
router.get('/api/dip', dip.getAll);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
