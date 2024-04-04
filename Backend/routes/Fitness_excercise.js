const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Fitness_excercise = require("../models/Fitness_excercise");
const Fitness_equipment = require("../models/Fitness_equipment")
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const upload = multer();

// ROUTE 1: Get All the Notes using: GET "/api/Fitness_excercise/getData". Login required
router.get("/getData",  async (req, res) => {
    try {
      // console.log("req",req)
      const {page , limit} = req.query;
      const no_of_docs_each_page = limit;  // 2 docs in single page
      const current_page_number = page;  // 3rd page
     
    //   .skip(no_of_docs_each_page * current_page_number)
    // .limit(no_of_docs_each_page)
    const getData = await Fitness_excercise.aggregate([
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
    },
       
     },
     {
      $unwind: "$equipment"
    },
  //   {
  //     $facet: {
  //         edges: [
  //           { $limit: parseInt(limit) },
  //             { $skip: parseInt(limit*page) },
             
  //         ]
  //     }
  // }
    ])

   
      // console.log("data",getData1)
      res.send(getData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  // ROUTE 2: Get All the Notes using: GET "/api/Fitness_excercise/insertData". Login required
router.post( "/insertData",
[body("name", "Enter a valid title").isLength({ min: 3 })],
async (req, res) => {
  try {
    const { name ,equipment_id , image } = req.body;
    console.log("equipment_id",equipment_id)
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = new Fitness_excercise({
      name, 
      equipment_id,
      image,
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
      const data = await Fitness_excercise.findOne({ _id: id });
      
      const getData = await Fitness_excercise.aggregate([
        { $match: { _id: { $eq: { $toObjectId: "64bd337497d483b70984f877" } } } },
      
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
       },
          
        },
       
        {
         $unwind: "$equipment"
       },
       {
        $match: {
            _id: id
        }
    },
       ])

      if(!data) {
          const error = new Error('data does not exist');
          return next(error);
      }
    console.log("getData",getData)
  res.json(data);

  } catch(error) {
      next(error);
  }
});

// ROUTE 3: Get All the Notes using: GET "/api/Fitness_excercise/updateData". Login required
router.put("/updateData/:id",  async (req, res) => {
    const { name ,equipment_id , image } = req.body;
try {
  // Create a newNote object
   const newData = {};

   if(name){
    newData.name = name;
   };
   if(equipment_id){
    newData.equipment_id = equipment_id;
   };
   if(image){
    newData.image = image;
   };

    // Find the note to be updated and update it
    const data = await Fitness_excercise.findById(req.params.id);
    if(!data) { 
      return res.status(404).send("Not Found")
    } ;

  //   if (note.user.toString() !== req.user.id) {
  //     return res.status(401).send("Not Allowed");
  // }

  const result = await Fitness_excercise.findByIdAndUpdate(req.params.id , {$set: newData } ,{ new: true})
  res.json({result});

} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
});

// ROUTE 4: Get All the Notes using: GET "/api/Fitness_excercise/deleteData". Login required
router.get("/deleteData/:id",  async (req, res) => {
try {
   // Find the note to be delete and delete it
   let note = await Fitness_excercise.findById(req.params.id);
   if (!note) { return res.status(404).send("Not Found") }

   // Allow deletion only if user owns this Note
//    if (note.user.toString() !== req.user.id) {
//        return res.status(401).send("Not Allowed");
//    }

   note = await Fitness_excercise.findByIdAndDelete(req.params.id)
   res.json({ "Success": "Note has been deleted", note: note });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
});

module.exports = router;