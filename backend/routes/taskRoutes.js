
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");
const upload = require("../config/multerConfig");

const router = require("express").Router();

router.get("/", getTasks);
// router.post("/", createTask);
router.post("/", upload.single("pdf"), createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;