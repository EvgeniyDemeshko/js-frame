const mongoose = require('mongoose');
const TaskStatus = require('../constants/taskStatus');

const taskSchema = new mongoose.Schema({
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    title: { type: String, trim: true, required: true, minLength: 3, maxLength: 100 },
    description: { type: String, trim: true, default: '' },
    assignee: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.TODO },
}, { timestamps: true });

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
