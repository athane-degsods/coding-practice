const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: String, required: true }
});

const exerciseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Add new user
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    const userId = new mongoose.Types.ObjectId().toString();
    const newUser = new User({ username: username, userId: userId });
    console.log(`New user created: ${username}, ID: ${userId}`);
    await newUser.save();
    res.json({ username: username, _id: userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Add exercise to user
app.post('/api/users/:userId/exercises', async (req, res) => {
  try {
    const { userId } = req.params;
    const { description, duration, date } = req.body;
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const exerciseDate = date ? new Date(date) : new Date();
    const newExercise = new Exercise({
      username: user.username,
      date: exerciseDate,
      duration: Number(duration),
      description: description,
      userId: user.userId
    });
    await newExercise.save();
    res.json({
      _id: user.userId,
      username: user.username,
      description: description,
      duration: Number(duration),
      date: exerciseDate.toDateString()
    });
  } catch (error) { 
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all user
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, { userId: 1, username: 1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get user exercise log
app.get('/api/users/:userId/logs', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Fetching logs for user ID: ${userId}`);
    const { from, to, limit } = req.query;
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const query = { username: user.username };
    if (from) {
      query.date = { $gte: new Date(from) };
    }
    if (to) {
      query.date = { ...query.date, $lte: new Date(to) };
    }
    const exercises = await Exercise.find(query).limit(parseInt(limit)).exec();
    res.json({
      username: user.username,
      count: exercises.length,
      _id: userId,
      log: exercises.map(exercise => ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})


// MISSION:
// Create a simple exercise tracker that is capable of:
// 1. Adding a user
// 2. Adding an exercise to a user
// 3. Retrieving a user's exercise log (including count of exercises and exercise details), having optional query parameters for date range and limit of exercises to return
// CODEFLOW:
// 1. POST /api/users create a new user, generate a unique id for the user and return the id in the response
// 2. POST /api/users/:_id/exercises add an exercise to a user, validate the user id, and return the exercise information in the response
// 3. GET /api/users/:_id/logs retrieve a user's exercise log, validate the user id, and return the log information in the response
// DATABASE:
// /api/users/:_id/exercises => json {id, username, date, duration, description}
// /api/users/:_id/logs => json {id, username, count, log: [{description, duration, date}]}