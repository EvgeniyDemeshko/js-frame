const express = require('express');
const router = express.Router();

const TaskMockController = require('../controllers/taskMockController');
const { validateTask, 
        validateTaskPatch,
        handleValidationErrors
 } = require('../validators/TaskValidator');

router.get('/tasks', TaskMockController.getTasks);
router.post('/tasks', validateTask, handleValidationErrors, TaskMockController.createTask);
router.put('/tasks/:id', validateTask, handleValidationErrors, TaskMockController.updateTask);
router.patch('/tasks/:id', validateTaskPatch, handleValidationErrors, TaskMockController.patchTask);
router.delete('/tasks/:id', TaskMockController.deleteTask);

module.exports = router;