const express = require('express');
const router = express.Router();
const controller = require('../controllers/membersController');

//accesspoints

router.route('/:empID/:taskname')
.patch(controller.editTaskCompletion);

router.route('/:username')
.get(controller.getASpecificMember)
.put(controller.assignANewTaskToMember)
.patch(controller.updateMemberInfo)
.delete(controller.deleteAMember);

router.route('/')
.get(controller.getAllMembers)
.post(controller.createAMember);

router.route('/login')
.post(controller.login);

module.exports = {router};