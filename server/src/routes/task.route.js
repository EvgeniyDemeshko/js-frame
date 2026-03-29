const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');

const { 
    validateTask, 
    handleValidationErrors, 
    validateTaskPatch } = require('../validators/TaskValidator');

router.get('/tasks', taskController.getTasks);
router.post('/tasks', validateTask, handleValidationErrors, taskController.createTask);
router.put('/tasks/:id', validateTask, handleValidationErrors, taskController.updateTask);
router.patch('/tasks/:id', validateTaskPatch, handleValidationErrors, taskController.patchTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
