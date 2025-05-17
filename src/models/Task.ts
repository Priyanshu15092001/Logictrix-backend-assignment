import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema(
  {
    title: {type:String, required:true},
    description: String,
    status: { type: String, enum: ['pending', 'in-progress', 'done'], default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedAt: Date,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
