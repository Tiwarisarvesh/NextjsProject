const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Fitness_bodypart = require("../models/Fitness_bodypart");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/notes/getData". Login required
router.get("/getData",  async (req, res) => {
  try {
    // console.log("req",req.body)
    const getData = await Fitness_bodypart.find({});
    res.json(getData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Get All the Notes using: GET "/api/notes/insertData". Login required
router.post( "/insertData", 
  [body("name", "Enter a valid title").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { name } = req.body;

      console.log("body", req.body.name);

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Fitness_bodypart({
        name,
        // user: req.user.id,
        user: "64b15442f7132217d362694a"
      });
      console.log("note",note)
      const savedNote = await note.save();

      res.json(savedNote);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get All the Notes using: GET "/api/notes/updateData". Login required
router.get('/getbyid/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const data = await Fitness_bodypart.findOne({ _id: id });

      if(!data) {
          const error = new Error('data does not exist');
          return next(error);
      }

  res.json(data);

  } catch(error) {
      next(error);
  }
});

// ROUTE 4: Get All the Notes using: GET "/api/notes/updateData". Login required
router.put("/updateData/:id",  async (req, res) => {
  const { name , user } = req.body;
  try {
    // Create a newNote object
     const newData = {};

     if(name){
      newData.name = name;
     };
     if(user){
      newData.user = user;
     };

      // Find the note to be updated and update it
      const data = await Fitness_bodypart.findById(req.params.id);
      if(!data) { 
        return res.status(404).send("Not Found")
      } ;

    //   if (note.user.toString() !== req.user.id) {
    //     return res.status(401).send("Not Allowed");
    // }

    const result = await Fitness_bodypart.findByIdAndUpdate(req.params.id , {$set: newData } ,{ new: true})
    res.json({result});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 5: Get All the Notes using: GET "/api/notes/deleteData". Login required
router.delete("/deleteData/:id",  async (req, res) => {
  try {
     // Find the note to be delete and delete it
     let note = await Fitness_bodypart.findById(req.params.id);
     if (!note) { return res.status(404).send("Not Found") }

     // Allow deletion only if user owns this Note
    //  if (note.user.toString() !== req.user.id) {
    //      return res.status(401).send("Not Allowed");
    //  }

     note = await Fitness_bodypart.findByIdAndDelete(req.params.id)
     res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
