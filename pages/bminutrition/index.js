import React, { useState, useEffect } from "react";
import Image from "next/image";
import banner1 from "../../public/Banner/Home_banner.jpeg";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import styles from "../../styles/Home.module.css";
import { Container } from "react-bootstrap";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import ExerciseList from "../../Exercise.json";
import ExerciseDetails from "../../ExerciseDetails.json";
import stylessss from "../excerciseList/excercise.module.css";
import bmistye from "../bmiexercise/bmiExercise.module.css"
import Bmis from '../bminutrition/bminutrition.module.css'

// import {useRouter} from 'next/router';
// import 'dotenv/config'
// require('dotenv').config()

function index() {
  // const router = useRouter()
  // console.log("window.location",router)
  // console.log("window.host",process.env.JWT_SECRET)

  const [selectedExcercise, setSelectedExcercise] = useState("");
  const [filteredData, setfilteredData] = useState(1);
  const [filteredDetails, setfiltereddetails] = useState(1);

  const [fitnessLevel, setFitnessLevel] = useState([{id : "Beginer" , Name: "Beginer"},{id : "Intermediate" , Name: "Intermediate"},{id : "Advance" , Name: "Advance"} ]);

  const [fitnessPlan, setFitnessPlan] = useState([
                {id : "Meal 1" , Name: "Meal 1"},
                {id : "Meal 2" , Name: "Meal 2"},
                {id : "Meal 3" , Name: "Meal 3"},
                {id : "Meal 4" , Name: "Meal 4"},
                {id : "Meal 5" , Name: "Meal 5"},
                {id : "Meal 6" , Name: "Meal 6"},
                {id : "Meal 7" , Name: "Meal 7"},
              
  ]);
  const [fitnessPlan1, setFitnessPlan1] = useState([
                {id : "Fat Loss Meal Plan for Men" , Name: "Fat Loss Meal Plan for Men"},
                {id : "Fat Loss Meal Plan for Women" , Name: "Fat Loss Meal Plan for Women"},
                {id : "weight Gain Meal Plan for Women" , Name: "weight Gain Meal Plan for Women"},
                {id : "Muscle gain Meal Plan for Men" , Name: "Muscle gain Meal Plan for Men"},
                
              
  ]);

  const [gender, setGender] = useState([{id : "Male" , Name: "Male"},{id : "Female" , Name: "Female"} ]);


  const [bodyPart, setBodyPart] = useState([]);
  const [foodAllDetails, setFoodAllDetails] = useState([]);

  const [fitnessLevelid, setFitnessLevelid] = useState("");
  
  const [fitnessPlanid, setFitnessPlanid] = useState("");
  const [fitnessPlanid1, setFitnessPlanid1] = useState("");
  const [genderid, setGenderid] = useState("");

  const selectedExcerciseData = (e) => {
    const setSelectedExcerciseValue = e.target.value;
    setSelectedExcercise(setSelectedExcerciseValue);
    // getExerciseAll(); 
  };

  
  const getmealgoalAll = async (e) => {
    // e.preventDefault();
    console.log("genderidunser",genderid)
    console.log("fitnessPlanidunder",fitnessPlanid)
    // &plan=${setFitnessPlanid1}
    try {
      const res = await fetch(
        `http://localhost:4000/api/fitnessfoodmealgoal/get-meals-goals?gender=${genderid}&meal=${fitnessPlanid}`,
        {
          method: "GET",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          // body: JSON.stringify({ gender: genderid , meal : fitnessPlanid }),
        }
      );
      const data = await res.json();
      setFoodAllDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBodyPart = async (selectedExcercise) => {
    try {
      
      const res = await fetch(
        `http://localhost:4000/api/fitnessBodypart/getData`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setBodyPart(data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("genderidbahar",genderid);
 

  const getChckeboxValue = (event) => {
    const value = event.target.value;

    const filteredDetails = ExerciseDetails.filter((employee) => {
      // console.log("employee",employee.userId = 1)
      return employee.userId == value;
    });
    setfiltereddetails(filteredDetails);

    
    console.log("value", value);
  };

  useEffect(() => {
    getBodyPart();
  }, []);
  useEffect(() => {
    getmealgoalAll();
  }, [genderid ,fitnessPlanid ]);

  return (
    <>
      <Navbar />

      {/* {console.log("ExerciseList",ExerciseList    )} */}
      {/* {console.log("foodAllDetails",foodAllDetails    )} */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src={banner1}
              width={10000}
              height={2000}
              alt="First Slide"
              className="d-block w-100"
            />
          </div>
        </div>
      </div>
      <Container>
        {/* Step -1 About Section */}
        {/* {console.log("selectedExcercise", selectedExcercise)} */}
        {/* {console.log("exerciseAllDetails", exerciseAllDetails.data)} */}
        <span className={bmistye.exerixenameTitle}> <h1 className={styles.aboutTitle}>Nutrition Details</h1></span>
        {/* {bodyPart.map((bodyParts, index) => (
          <button
            onClick={selectedExcerciseData}
            value={bodyParts.name}
            type="button"
            className="btn btn-outline-success m-2"
          >
            {" "}
            Fitnese {bodyParts.name}
          </button>
        ))} */}

         <div className={bmistye.filterSection}>
        <div className="row">
          <div className="col-lg-6 col-sm-12 mt-4">
          <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Gender
                      </label>
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setGenderid(e.target.value)}>
                      <option selected>Select Option</option>
                      {gender && gender.map((data) => (
                      <option key={data.id} value={data.id}>{data.Name}</option>
                      ))} 
                    </select>
                    </div>
          </div>
          <div className="col-lg-6 col-sm-12 mt-4">
            <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Select Meal
                      </label>
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setFitnessPlanid(e.target.value)}>
                      <option selected>Select Option</option>
                      {fitnessPlan && fitnessPlan.map((data) => (
                      <option key={data.id} value={data.id}>{data.Name}</option>
                      ))}
                    </select>
                    </div>
          </div>
          {/* <div className="col-lg-6 col-sm-12 mt-4">
            <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Select Goal
                      </label>
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setFitnessPlanid1(e.target.value)}>
                      <option selected>Select Option</option>
                      {fitnessPlan1 && fitnessPlan1.map((data) => (
                      <option key={data.id} value={data.id}>{data.Name}</option>
                      ))}
                    </select>
                    </div>
          </div> */}
        </div>
        </div>

       {/* {exerciseAllDetails?.data?.exercises?.map((data, index) => (
         <div className="row">
          <span className={bmistye.exerixenameTitle}>
         <h1 className={styles.aboutTitle}>BodyPart : {selectedExcercise}</h1>
         </span>
            <div className="col-lg-6 col-sm-12 mt-4">
            <Image
              src={banner1}
              width={500}
              height={300}
              alt="First Slide"
              className={bmistye.exeimage}
            />
            </div>
            <div className="col-lg-6 col-sm-12 mt-4">
               <div>
                  
                  <p>Fitnese-Level : {data.fitness_level}</p>
                  <p>Plan : {data.fitness_plan}</p>
                  <p>Gender : {data.gender}</p>
                  <p>Stes : {data.reps}</p>
               </div>
               <div>
                  <h1 className={bmistye.exercss}>Exercise Details</h1>
                  <p>Name : {data.exercise?.name}</p>
               </div>
               <div>
                  <h1 className={bmistye.equipcss}>Equipment Details</h1>
                  <p>Name : {data?.equipment?.name} </p>
               </div>
            </div>

         </div>
         ))} */}

      {foodAllDetails?.data?.map((data, index) => (
        <div className={Bmis.border}>
         <div className="row">
          <div className="col-lg-6 col-sm-12 mt-4">
          <h3><span className={Bmis.title}>Food</span> :{data.foods.name} </h3>
           <h3><span className={Bmis.title}>calaries</span> :{data.foods.calories} </h3>
           <h3><span className={Bmis.title}>Goal</span> :{data.goals.fitnessPlan} </h3>
          </div>
          <div className="col-lg-6 col-sm-12 mt-4">
          <h3><span className={Bmis.title}>Gender</span> :{data.goals.gender} </h3>
           <h3><span className={Bmis.title}>Plan</span> :{data.goals.name} </h3>
           <h3><span className={Bmis.title}> Meal</span> :{data.meals.name} </h3>
          </div>
           
         </div>
         </div>
          ))}



      </Container>
      <Footer />
    </>
  );
}

export default index;
