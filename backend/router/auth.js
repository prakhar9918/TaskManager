import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const allowedRoles = ["ADMIN", "MEMBER"];
    const userRole = allowedRoles.includes(role) ? role : "MEMBER";

    const user = await User.create({
      name,
      email,
      password: hash,
      role: userRole,
    });

    res.json(user);

  } catch (err) {
    console.error("Signup Error:", err);  // 🔥 VERY IMPORTANT
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

router.get("/users", auth, async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ msg: "Only admins can view users" });
    }

    const users = await User.find({ role: "MEMBER" }).select("_id name");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching users" });
  }
});

export default router;