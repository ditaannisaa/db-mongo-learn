const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://admin:admin@mgidita.fhxlrz0.mongodb.net/?retryWrites=true&w=majority&appName=MGIdita');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const UserSchema = new mongoose.Schema({
    nama: String,
    hobi: String,
    alamat: String,
    nomor_telepon: Number
  });
  
  const User = mongoose.model('User', UserSchema);
  
  // Routes
  // Create user
  app.post('/user', async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).json({message: 'successfully created'});
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  });
  
  // Read All users
  app.get('/users', async (req, res) => {
    try {
      const user = await User.find();
      console.log(user);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch users' });
    }
  });
  
  // Read user by ID
  app.get('/user/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch user' });
    }
  });
  
  // Update user by ID
  app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  });
  
  // Delete user by ID
  app.delete('/user/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' });
    }
  });