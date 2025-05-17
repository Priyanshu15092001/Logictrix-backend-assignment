import cron from 'node-cron';
const Task = require('../models/Task');

// Schedule the job to run every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  console.log('[CRON] Running auto-close in-progress tasks job...');

  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  try {
    const tasks = await Task.find({
      status: 'in-progress',
      updatedAt: { $lte: twoHoursAgo },
    });

    for (const task of tasks) {
      task.status = 'done';
      task.completedAt = new Date();
      await task.save();
      console.log(`[CRON] Auto-closed task: ${task._id}`);
    }

    console.log(`[CRON] Auto-closed ${tasks.length} tasks.`);
  } catch (error) {
    console.error('[CRON] Error auto-closing tasks:', error);
  }
});
