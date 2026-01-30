const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
// const taskRoutes = require('./routes/taskRoutes');
const TaskService = require('./services/taskServices');

const taskModel = require("./models/Task.js");
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("./controllers/taskController");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 8082;
const MONGO_URL = 'mongodb+srv://dhinadts:Qwerty%40123@cluster0.g8vjqco.mongodb.net/task-manager?appName=Cluster0';

mongoose.connect(MONGO_URL,/*  {
    useNewUrlParser: true, useUnifiedTopology: true
} */
)
    .then(() => { console.log("Connected to MongoDB") })
    .catch((err) => { console.log("Error connecting to MongoDB:", err) });

app.use(cors());
app.use(express.json());
// app.use('/tasks', taskRoutes);

console.log(taskModel);

// const TaskService = require("./services/task.service");

const TaskServiceInstance = new TaskService();
console.log(
    TaskServiceInstance.find,
    TaskServiceInstance.create,
    TaskServiceInstance.update,
    TaskServiceInstance.delete
);


app.use("/tasks", taskRoutes);



console.log(getTasks, createTask, updateTask, deleteTask);
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`); })