// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/tokens").then(()=>{console.log("mongodb connected")});

// Signup Route
app.post('/signup', async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'Email already exists' ,id:existingUser._id


      });
    }

    const newUser = new User({ email });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' ,id:newUser._id});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}); 
app.get('/user/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/user/:_id/tune', async (req, res) => {
  const { _id } = req.params;
  const { tune } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (tune && isConsecutiveDay(user.createdAt)||tune&&user.c) {
      user.day = user.day < 7 ? user.day + 1 : 1;

      if (user.day === 4) {
        user.tokens += 500;
        user.goal = 7;
      } else if (user.day === 8) {
        user.day = 1;
        user.goal = 3;
        user.tokens += 1000;
      }

      user.createdAt = new Date(); 
  

      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: 'Invalid request: Tune could not be created.' });
    }
  } catch (error) {
    console.error('Error updating tune status:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

function isConsecutiveDay(lastTuneDate) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  return lastTuneDate.toDateString() === yesterday.toDateString();
}



const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
