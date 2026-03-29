const TaskStatus = require('../constants/taskStatus');

const tasks = [
    {
        id: 0,
        title: 'Встановити Angular',
        assignee: 'Євгеній',
        dueDate: new Date('2026-03-28'),
        status: TaskStatus.DONE
    },
];

module.exports = { tasks };