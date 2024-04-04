const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Fitness_foodmealgoal = require("../models/Fitness_foodmealgoal");
const Fitness_food = require("../models/Fitness_food");
const Fitness_meal = require("../models/Fitness_meal");
const Fitness_goal = require("../models/Fitness_meal");

const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/notes/getData". Login required
router.get("/getData", async (req, res) => {
  try {
    // console.log("req",req.body)
    // const boydpart = await Fitness_food.findOne({name: bodyPart})

    const getData = await Fitness_foodmealgoal.find({});
    const Fitness_food1 = await Fitness_food.find();
    const Fitness_meal2 = await Fitness_meal.find();
    const Fitness_goal3 = await Fitness_goal.find();

    console.log("getData",getData)
    // console.log("Fitness_food1",Fitness_food1)
    // console.log("Fitness_meal2",Fitness_meal2)
    // console.log("Fitness_meal3",Fitness_goal3)
    res.json(getData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});



// ROUTE 2: Get All the Notes using: GET "/api/notes/insertData". Login required
router.post( "/insertData", async (req, res) => {
    try {
      const { food_id , goal_id, meal_id } = req.body;

      console.log("body", req.body.name);

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Fitness_foodmealgoal({
        food_id,
        goal_id,
        meal_id,
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
      const data = await Fitness_foodmealgoal.findOne({ _id: id });

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
router.put("/updateData/:id", async (req, res) => {
    const { food_id , goal_id, meal_id } = req.body;
  try {
    // Create a newNote object
     const newData = {};

     if(food_id){
      newData.food_id = food_id;
     };

     if(goal_id){
        newData.goal_id = goal_id;
       };
     if(meal_id){
        newData.meal_id = meal_id;
       };


      // Find the note to be updated and update it
      const data = await Fitness_foodmealgoal.findById(req.params.id);
      if(!data) { 
        return res.status(404).send("Not Found")
      } ;

    //   if (note.user.toString() !== req.user.id) {
    //     return res.status(401).send("Not Allowed");
    // }

    const result = await Fitness_foodmealgoal.findByIdAndUpdate(req.params.id , {$set: newData } ,{ new: true})
    res.json({result});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 5: Get All the Notes using: GET "/api/notes/deleteData". Login required
router.delete("/deleteData/:id" , async (req, res) => {
  try {
     // Find the note to be delete and delete it
     let note = await Fitness_foodmealgoal.findById(req.params.id);
     if (!note) { return res.status(404).send("Not Found") }

     // Allow deletion only if user owns this Note
    //  if (note.user.toString() !== req.user.id) {
    //      return res.status(401).send("Not Allowed");
    //  }

     note = await Fitness_foodmealgoal.findByIdAndDelete(req.params.id)
     res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// router.get("/get-meals-goals", async (req, res) => {
//   try {
//     const query = [
//       {
//         $lookup: {
//           from: "fitness_foods",
//           let: { id: { $toObjectId: "$food_id" } },
//           pipeline: [
//             {
//               $match: {
//                 $expr: { $eq: ["$_id", "$$id"] },
//               },
//             },
//           ],
//           as: "foods",
//         },
//       },
//       {
//         $unwind: "$foods",
//       },
//       {
//         $lookup: {
//           from: "fitness_goals",
//           let: { id: { $toObjectId: "$goal_id" } },
//           pipeline: [
//             {
//               $match: {
//                 $expr: { $eq: ["$_id", "$$id"] },
//               },
//             },
//           ],
//           as: "goals",
//         },
//       },
//       {
//         $unwind: "$goals",
//       },
//       {
//         $lookup: {
//           from: "fitness_meals",
//           let: { id: { $toObjectId: "$meal_id" } },
//           pipeline: [
//             {
//               $match: {
//                 $expr: { $eq: ["$_id", "$$id"] },
//               },
//             },
//           ],
//           as: "meals",
//         },
//       },
//       {
//         $unwind: "$meals",
//       },
//     ];

//     const data = await Fitness_foodmealgoal.aggregate(query);

//     return res.status(200).json({ message: "data fetched successfully", data });
//   } catch (error) {
//     console.log(error);

//     return res
//       .status(500)
//       .json({ message: "something went wrong", data: null });
//   }
// });

router.get("/get-meals-goals", async (req, res) => {
  const {gender, meal,plan} = req.query
  const queryForgender = {
    $expr: { $eq: ["$_id", "$$id"] },
  }
  if(gender){
    queryForgender.gender = gender
  }
  // if(plan){
  //   queryForgender.id = plan
  // }

  const queryFormeal = {
    $expr: { $eq: ["$_id", "$$id"] },
  }
  if(meal){
    queryFormeal.name = meal
  }

  try {
    const query = [
      {
        $lookup: {
          from: "fitness_foods",
          let: { id: { $toObjectId: "$food_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$id"] },
              },
            },
          ],
          as: "foods",
        },
      },
      {
        $unwind: "$foods",
      },
      {
        $lookup: {
          from: "fitness_goals",
          let: { id: { $toObjectId: "$goal_id" } },
          pipeline: [
            {
              $match: {
                ...queryForgender
              },
            },
          ],
          as: "goals",
        },
      },
      {
        $unwind: "$goals",
      },
      {
        $lookup: {
          from: "fitness_meals",
          let: { id: { $toObjectId: "$meal_id" } },
          pipeline: [
            {
              $match: {
                ...queryFormeal
              },
            },
          ],
          as: "meals",
        },
      },
      {
        $unwind: "$meals",
      },
    ];

    const data = await Fitness_foodmealgoal.aggregate(query);

    return res.status(200).json({ message: "data fetched successfully", data });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "something went wrong", data: null });
  }
});

module.exports = router;
