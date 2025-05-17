import { Request, Response } from 'express';
const Task = require('../models/Task');
const User = require('../models/User');

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, userId } = req.body;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check for duplicate task title for same user
    const duplicate = await Task.findOne({ title, userId });
    if (duplicate) {
      return res.status(400).json({ message: 'Duplicate task title for this user' });
    }

    // Create task
    const task = new Task({ title, description, userId });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getUserTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ message: 'userId query parameter is required' });
    }

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all tasks for the user
    const tasks = await Task.find({ userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'in-progress', 'done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update status and timestamp
    task.status = status;
    if (status === 'done') {
      task.completedAt = new Date();
    } else {
      task.completedAt = undefined;
    }

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports={createTask,getUserTasks,updateTaskStatus,deleteTask}