const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Fitness_bodypartexcercise = require("../models/Fitness_bodypartexcercise");
const Fitness_equipment = require("../models/Fitness_equipment");
const Fitness_excercise = require("../models/Fitness_excercise");
const Fitness_bodypart = require("../models/Fitness_bodypart");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const upload = multer();

router.post("/get-exercise", async (req, res) => {
  try {
    const { bodyPart, gender, level, plan } = req.body;

    //get body part
    const boydpart = await Fitness_bodypart.findOne({ name: bodyPart });
    
    if (!boydpart) {
      return res
        .status(200)
        .json({ message: "Internal Server Error bodypart" });
    }
    const options = {};

    if (gender) {
      options["gender"] = gender.trim();
    }
    if (level) {
      options["fitness_level"] = level.trim();
    }
    if (plan) {
      options["fitness_plan"] = plan;
    }

    const getExrcises = await Fitness_bodypartexcercise.find({
      body_part_id: boydpart._id,
      ...options,
    });

    if (!getExrcises?.length) {
      return res.status(400).send("unable to find exercise");
    }

    //get particular exercise
    const exercises = await Promise.all(
      getExrcises.map(async (x) => {
        const exercise = await Fitness_excercise.findById(x.excercise_id);

        //get equipments also
        const equipment = await Fitness_equipment.findById(
          exercise?.equipment_id
        );

        return { ...x._doc, exercise, equipment };
      })
    );

    return res
      .status(200)
      .json({
        message: "data fetched successfully",
        data: { exercises, boydpart },
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 1: Get All the Notes using: GET "/api/Fitness_bodypartexcercise/getData". Login required
router.get("/getData", async (req, res) => {
  try {
    console.log("req", req);
    var body = req.body;
    const getData1 = await Fitness_bodypartexcercise.find({});
    // const getData = await Fitness_bodypartexcercise.aggregate([
    //   {
    //    $lookup:{
    //      from:"Fitness_bodypartexcercise",
    //      let: { id: { $toObjectId: "$equipment_id" } },
    //      pipeline:[
    //          {
    //              $match: {
    //                  $expr: { $eq: ["$_id", "$$id"] },
    //                },
    //          }
    //      ],
    //      as: "equipment"
    //  },

    //   },
    //   {
    //    $unwind: "$equipment"
    //  },
    //  ])

    console.log("res", res);
    res.send(getData1);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FetchAllDetails", async (req, res) => {
  try {
    const query = [
      {
        $lookup: {
          from: "fitness_excercises",
          let: { id: { $toObjectId: "$excercise_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$id"] 
              
              },
              },
              // $match: {
              //   $expr: { $eq: ["$_id", "$$id"] },
              // },
            },
            {
              $lookup: {
                from: "fitness_equipments",
                let: { id: { $toObjectId: "$equipment_id" } },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$id"] },
                    },
                    // $match: {
                    //   $expr: { $eq: ["$_id", "$$id"] },
                    // },
                  },
                ],
                as: "equipment",
              },
            },
          ],
          as: "exercise",
        },
      },
      {
        $unwind: "$exercise",
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
              // $match: {
              //   $expr: { $eq: ["$_id", "$$id"] },
              // },
            },
          ],
          as: "bodypart",
        },
      },
      {
        $unwind: "$bodypart",
      },
    ];

    const data = await Fitness_bodypartexcercise.aggregate(query);
    console.log("data", data);

    return res
      .status(200)
      .json({ message: "data fetched successfully123", data });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "something went wrong dd", data: null });
  }
});

// ROUTE 2: Get All the Notes using: GET "/api/Fitness_bodypartexcercise/insertData". Login required
router.post("/insertData", async (req, res) => {
  try {
    const {
      body_part_id,
      excercise_id,
      fitness_level,
      fitness_plan,
      gender,
      reps,
    } = req.body;
    console.log("req.body", req.body);
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = new Fitness_bodypartexcercise({
      body_part_id,
      excercise_id,
      fitness_level,
      fitness_plan,
      gender,
      reps,
      //   user: req.user.id,
    });

    const savedNote = await data.save();

    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Get All the Notes using: GET "/api/notes/updateData". Login required
router.get("/getbyid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Fitness_bodypartexcercise.findOne({ _id: id });

    if (!data) {
      const error = new Error("data does not exist");
      return next(error);
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ROUTE 3: Get All the Notes using: GET "/api/Fitness_bodypartexcercise/updateData". Login required
router.put("/updateData/:id", async (req, res) => {
  const {
    body_part_id,
    excercise_id,
    fitness_level,
    fitness_plan,
    gender,
    reps,
  } = req.body;
  try {
    // Create a newNote object
    const newData = {};

    if (body_part_id) {
      newData.body_part_id = body_part_id;
    }
    if (excercise_id) {
      newData.excercise_id = excercise_id;
    }
    if (fitness_level) {
      newData.fitness_level = fitness_level;
    }
    if (fitness_plan) {
      newData.fitness_plan = fitness_plan;
    }
    if (gender) {
      newData.gender = gender;
    }
    if (reps) {
      newData.reps = reps;
    }

    // Find the note to be updated and update it
    const data = await Fitness_bodypartexcercise.findById(req.params.id);
    if (!data) {
      return res.status(404).send("Not Found");
    }

    //   if (note.user.toString() !== req.user.id) {
    //     return res.status(401).send("Not Allowed");
    // }

    const result = await Fitness_bodypartexcercise.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    res.json({ result });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Get All the Notes using: GET "/api/Fitness_bodypartexcercise/deleteData". Login required
router.delete("/deleteData/:id", async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Fitness_bodypartexcercise.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    //    if (note.user.toString() !== req.user.id) {
    //        return res.status(401).send("Not Allowed");
    //    }

    note = await Fitness_bodypartexcercise.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
