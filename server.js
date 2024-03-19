const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://guesmisinda123:Sindafifi123@cluster0.8hyag9a.mongodb.net/person"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    res.json(deletedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
