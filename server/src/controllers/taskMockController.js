const { tasks } = require('../models/taskMockModel');

const getTasks = (req, res) => {
    let filteredTasks = [...tasks];

    if (req.query.status) {
        filteredTasks = filteredTasks.filter(task => String(task.status) === String(req.query.status));
    }

    res.json(filteredTasks);
}

const createTask = (req, res) => {
    const taskId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask = {
        id: taskId,
        ...req.body
    }

    tasks.push(newTask);

    res.status(201).json(newTask);
}

const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const updateTask = { ...req.body };

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { id: taskId , ...updateTask};
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Завдання не знайдено' });
    }
}

const patchTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const updates = req.body;

    const task = tasks.find(task => task.id === taskId);
    if (task) {
        Object.assign(task, updates);
        res.json(task);
    } else {
        res.status(404).json({ message: 'Завдання не знайдено' });
    }
}

const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.json({ message: `Завдання ${taskId} видалено` });
    } else {
        res.status(404).json({ message: 'Завдання не знайдено' });
    }
}

module.exports = { getTasks, createTask, updateTask, patchTask, deleteTask };