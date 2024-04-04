const express = require("express");
const Fitness_food = require("../models/Fitness_food");
const Fitness_foodpost = require("../models/Fitness_foodpost");
const router = express.Router();

router.get("/get-food-posts", async (req, res) => {
  try {
    // const { gender } = req.body;

    const getAllPosts = await Fitness_foodpost.find();
    console.log("data", getAllPosts);

    // if (!getAllPosts) {
    //   return res
    //     .status(200)
    //     .json({ message: "Internal Server Error bodypart" });
    // }

    // const options = {};

    // if (gender) {
    //   options["gender"] = gender.trim();
    // }

    //get Food also
    // const getExrcises = await Fitness_food.findById({ post: foodID, ...options, });
    //   console.log("getExerice",getExrcises)

    const data = await Promise.all(
      getAllPosts.map(async (post) => {
        const food = await Fitness_food.findById(post.foodID);

        return { ...post._doc, food };
      })
    );

    return res.status(200).json({ message: "data fetched successfully", data });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "something went wrong", data: null });
  }
});

router.get("/getData", async (req, res) => {
  try {
    // console.log("req",req.body)
    const limitValue = req.query.limit || 2;
    const getData = await Fitness_foodpost.find();
    res.json(getData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/insertData",
  async (req, res) => {
    try {
      const { gender, category, image,description,foodID } = req.body;

      console.log("body", req.body);

      // If there are errors, return Bad request and the errors
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }
      const note = new Fitness_foodpost({
        gender,
        category,
        image,
        description,
        foodID,
      });
      console.log("note", note);
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get All the Notes using: GET "/api/notes/updateData". Login required
router.get("/getbyid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Fitness_foodpost.findOne({ _id: id });

    if (!data) {
      const error = new Error("data does not exist");
      return next(error);
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ROUTE 4: Get All the Notes using: GET "/api/notes/updateData". Login required
router.put("/updateData/:id", async (req, res) => {
  const { gender, category, image,description,foodID } = req.body;
  try {
    // Create a newNote object
    const newData = {};

    if (gender) {
      newData.gender = gender;
    }
    if (category) {
      newData.category = category;
    }
    if (image) {
      newData.image = image;
    }
    if (description) {
      newData.description = description;
    }
    if (foodID) {
      newData.foodID = foodID;
    }

    // Find the note to be updated and update it
    const data = await Fitness_foodpost.findById(req.params.id);
    if (!data) {
      return res.status(404).send("Not Found");
    }

    //   if (note.user.toString() !== req.user.id) {
    //     return res.status(401).send("Not Allowed");
    // }

    const result = await Fitness_foodpost.findByIdAndUpdate(
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

// ROUTE 5: Get All the Notes using: GET "/api/notes/deleteData". Login required
router.delete("/deleteData/:id", async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Fitness_foodpost.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    //  if (note.user.toString() !== req.user.id) {
    //      return res.status(401).send("Not Allowed");
    //  }

    note = await Fitness_foodpost.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
