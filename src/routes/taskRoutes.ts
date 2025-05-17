import { Router } from 'express';
const { createTask,getUserTasks,updateTaskStatus,deleteTask } = require('../controllers/taskController');

const router = Router();

router.post('/tasks', createTask); 
router.get('/tasks', getUserTasks);
router.patch('/tasks/:id/status', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);

module.exports=router
