const connectDB = require('./db');
const express = require('express');
const cors = require('cors')

connectDB();
const app = express()
const port = 4000
//// nodemon ./index.js 
app.use(express.json());
app.use(cors())

// init Routers
const auth = require('./routes/auth');
const authUser = require('./routes/auth_user');
const fitnessBodypart = require('./routes/Fitness_bodypart');
const fitnessBodypartexcerise = require('./routes/Fitness_bodypartexcercise');
const fitnessequipment = require('./routes/Fitness_equipment');
const fitnessexcerise = require('./routes/Fitness_excercise');
const fitnessexcercisepost = require('./routes/Fitness_excercisepost');
const fitnessfood = require('./routes/Fitness_ food');
const fitnessfoodmealgoal = require('./routes/Fitness_ foodmealgoal');
const fitnessfoodpost = require('./routes/Fitness_ foodpost');
const fitnessgoal = require('./routes/Fitness_ goal');
const fitnessmeal = require('./routes/Fitness_ meal');
const contactus = require('./routes/Contactus');
 
//Call Routers
app.use('/api/auth/' , auth);

app.use('/api/authUser/' , authUser);
// Routes Fitness Body part
app.use('/api/fitnessBodypart',fitnessBodypart);
// Routes Fitness Body part Excercise
app.use('/api/fitnessBodypartexcerise',fitnessBodypartexcerise);
// Routes Fitness Equipment
app.use('/api/fitnessequipment',fitnessequipment);
// Routes Fitness Excercise
app.use('/api/fitnessexcerise',fitnessexcerise);
// Routes Fitness Excercise Post
app.use('/api/fitnessexcercisepost',fitnessexcercisepost);
// Routes Fitness_ Food
app.use('/api/fitnessfood',fitnessfood);
// Routes Fitness Foodmeal Goal
app.use('/api/fitnessfoodmealgoal',fitnessfoodmealgoal);
// Routes Fitness Foodpost
app.use('/api/fitnessfoodpost',fitnessfoodpost);
// Routes Fitness Goal
app.use('/api/fitnessgoal',fitnessgoal);
// Routes Fitness Meal
app.use('/api/fitnessmeal',fitnessmeal);
app.use('/api/contactus',contactus);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
