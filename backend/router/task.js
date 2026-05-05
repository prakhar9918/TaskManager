import express from "express";
import Task from "../model/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// 🔥 Admin creates task
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ msg: "Only admin can assign tasks" });
    }

    const { title, description, assignedTo, project, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user.id,
      project,
      dueDate,
      status: "TODO"
    });

    res.json(task);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating task" });
  }
});


// 🔥 Get tasks
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "ADMIN") {
      tasks = await Task.find().populate("assignedTo").populate("assignedBy");
    } else {
      tasks = await Task.find({ assignedTo: req.user.id }).populate("assignedBy");
    }

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});


// 🔥 Update task status
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    // 🔥 Only assigned user OR admin
    if (
      req.user.role !== "ADMIN" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = req.body.status || task.status;

    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Error updating task" });
  }
});

export default router;