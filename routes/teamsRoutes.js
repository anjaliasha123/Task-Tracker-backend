const express = require('express');
const router = express.Router();
const controller = require('../controllers/teamsController');
//access points

router.route('/:empID/:teamname')
.patch(controller.validateJWT,controller.addMemberToTeam);

router.route('/')
.get( controller.retrieveAllTeams)
.post(controller.createATeam);

module.exports = {router};