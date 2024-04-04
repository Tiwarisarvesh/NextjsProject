const express = require("express");
const Fitness_excercisepost = require("../models/Fitness_excercisepost");
const Fitness_food = require("../models/Fitness_food");
const router = express.Router();

router.get("/get-exercise-posts", async (req, res) => {
  try {

    const query = [
      {
        $lookup: {
            from: "fitness_excercises",
            let: { id: { $toObjectId: "$excercise_id" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$id"] },
                },
              },
              {
                  $lookup:{
                      from:"fitness_equipments",
                      let: { id: { $toObjectId: "$equipment_id" } },
                      pipeline:[
                          {
                              $match: {
                                  $expr: { $eq: ["$_id", "$$id"] },
                                },
                          }
                      ],
                      as: "equipment"
                  }
              }
            ],
            as: "exercise",
          
        }
      },
      {
        $unwind: "$exercise"
      },
      {
        $lookup: {
            from: "fitness_bodyparts",
            let: { id: { $toObjectId: "$body_part_id" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$id"] },
                },
              }
            ],
            as: "bodypart",
          },
      },
      {
        $unwind: "$bodypart"
      }
    ];

    const data = await Fitness_excercisepost.aggregate(query);
    console.log("data",data)

    return res.status(200).json({ message: "data fetched successfully123", data });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "something went wrong", data: null });
  }
});

router.post( "/insertData",
async (req, res) => {
  try {
    const { gender ,image , description ,body_part_id , excercise_id } = req.body;
    
    // If there are errors, return Bad request and the errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const data = new Fitness_excercisepost({
      gender, 
      description,
      image,
      body_part_id,
      excercise_id,
    //   user: req.user.id,
    });
    
    const savedNote = await data.save();

    res.json(savedNote);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}
);

router.get('/getbyid/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const data = await Fitness_excercisepost.findOne({ _id: id });

      if(!data) {
          const error = new Error('data does not exist');
          return next(error);
      }

  res.json(data);

  } catch(error) {
      next(error);
  }
});

// ROUTE 3: Get All the Notes using: GET "/api/Fitness_excercise/updateData". Login required
router.put("/updateData/:id",  async (req, res) => {
  const { gender ,image , description ,body_part_id , excercise_id } = req.body;
try {
  // Create a newNote object
   const newData = {};

   if(gender){
    newData.gender = gender;
   };
   if(description){
    newData.description = description;
   };
   if(image){
    newData.image = image;
   };
   if(body_part_id){
    newData.body_part_id = body_part_id;
   };
   if(excercise_id){
    newData.excercise_id = excercise_id;
   };

    // Find the note to be updated and update it
    const data = await Fitness_excercisepost.findById(req.params.id);
    if(!data) { 
      return res.status(404).send("Not Found")
    } ;

  //   if (note.user.toString() !== req.user.id) {
  //     return res.status(401).send("Not Allowed");
  // }

  const result = await Fitness_excercisepost.findByIdAndUpdate(req.params.id , {$set: newData } ,{ new: true})
  res.json({result});

} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
});

// ROUTE 4: Get All the Notes using: GET "/api/Fitness_excercise/deleteData". Login required
router.delete("/deleteData/:id",  async (req, res) => {
try {
   // Find the note to be delete and delete it
   let note = await Fitness_excercisepost.findById(req.params.id);
   if (!note) { return res.status(404).send("Not Found") }

   // Allow deletion only if user owns this Note
//    if (note.user.toString() !== req.user.id) {
//        return res.status(401).send("Not Allowed");
//    }

   note = await Fitness_excercisepost.findByIdAndDelete(req.params.id)
   res.json({ "Success": "Note has been deleted", note: note });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
});

module.exports = router;
