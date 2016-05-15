var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var members = require('./members.js');
var dip = require('./dip.js');
var mydip = require('./mydip.js');
var form = require('./form.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/signin', auth.signin);
router.get('/admin', auth.isAdmin);
/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/members', members.getAll);
router.get('/api/members/:id', members.getOne);
router.get('/api/myProfile', members.getMy);
router.post('/api/members/formateur/', members.formateur);




router.post('/api/dip/addDip', dip.create);
router.get('/api/dip', dip.getAll);

router.post('/api/dip/addMyDip', mydip.create);
router.post('/api/dip/getMyDip', mydip.getOne);

router.post('/api/form/addForm', form.create);
router.post('/api/form/validateForm', form.validateForm);
router.post('/api/form/addParticipation', form.addPart);
router.post('/api/form/deleteParticipation', form.deletePart);
router.post('/api/form/deleteForm', form.delete);
router.get('/api/form', form.getAll);
router.get('/api/form/:id', form.getOne);

module.exports = router;
