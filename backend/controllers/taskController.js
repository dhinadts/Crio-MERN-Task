const taskService = require('../services/taskServices');

const TaskServiceInstance = new taskService();

const getTasks = async (req, res) => {
    try {
        const tasks = await TaskServiceInstance.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        const linkedFile = req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null;

        const newTask = await TaskServiceInstance.create({
            title,
            description,
            deadline,
        });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TaskServiceInstance.update(id, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TaskServiceInstance.delete(id);
        res.status(204).send(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
/* exports.createTask = async (req, res) => {
    try {
        const data = {
            ...req.body,
            linkedFile: req.file ? req.file.buffer : null
        };
        const task = await taskService.createTask(data);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const tasks = await taskService.getTasks();
    res.json(tasks);
};

exports.updateTask = async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    await taskService.deleteTask(req.params.id);
    res.json({ message: 'Task deleted' });
};

exports.downloadFile = async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    if (!task || !task.linkedFile) {
        return res.status(404).json({ message: 'File not found' });
    }
    res.set('Content-Type', 'application/pdf');
    res.send(task.linkedFile);
};
 */