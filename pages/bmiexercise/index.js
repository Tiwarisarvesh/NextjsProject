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
  const [fitnessPlan, setFitnessPlan] = useState([{id : "Gain" , Name: "Gain"},{id : "Loss" , Name: "Lose"} ]);
  const [gender, setGender] = useState([{id : "Male" , Name: "Male"},{id : "Female" , Name: "Female"} ]);

  const [bodyPart, setBodyPart] = useState([]);
  const [exerciseAllDetails, setExerciseAllDetails] = useState([]);

  const [fitnessLevelid, setFitnessLevelid] = useState("");
  const [fitnessPlanid, setFitnessPlanid] = useState("");
  const [genderid, setGenderid] = useState("");

  const selectedExcerciseData = (e) => {
    const setSelectedExcerciseValue = e.target.value;
    setSelectedExcercise(setSelectedExcerciseValue);
    // getExerciseAll(); 
  };

  console.log("selectedExcercise",selectedExcercise);
  const getExerciseAll = async (e) => {
    // e.preventDefault();
    try {
      // console.log("genderidunder",genderid);
      const res = await fetch(
        `http://localhost:4000/api/fitnessBodypartexcerise/get-exercise/`,
        {
          method: "POST",
          headers: {
            // "auth-token":
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYmI5YTg0YTA4Mzg1NjI5YWI3N2QyIn0sImlhdCI6MTY4ODk5ODg4MX0.C4t2oec5CZ7FgzJ1mSf2wKrh_qI0_QTXzMzfOW5PLSg",
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ bodyPart: selectedExcercise, gender: genderid , plan : fitnessPlanid , level:fitnessLevelid  }),
        }
      );
      const data = await res.json();
      setExerciseAllDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBodyPart = async (selectedExcercise) => {
    try {
      console.log("selectedExcercisefunction",selectedExcercise)
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
    getExerciseAll();
  }, [selectedExcercise, genderid ,fitnessPlanid,fitnessLevelid]);

  return (
    <>
      <Navbar />

      {/* {console.log("ExerciseList",ExerciseList    )} */}
      {/* {console.log("filteredPeople",filteredPeople    )} */}
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
        <span className={bmistye.exerixenameTitle}> <h1 className={styles.aboutTitle}>Exercise List Details</h1></span>
        {bodyPart.map((bodyParts, index) => (
          <button
            onClick={selectedExcerciseData}
            value={bodyParts.name}
            type="button"
            className="btn btn-outline-success m-2"
          >
            {" "}
            Fitnese {bodyParts.name}
          </button>
        ))}

         <div className={bmistye.filterSection}>
        <div className="row">
          <div className="col-lg-4 col-sm-12 mt-4">
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
          <div className="col-lg-4 col-sm-12 mt-4">
          <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Fitness Level
                      </label>
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setFitnessLevelid(e.target.value)}>
                      <option selected>Select Option</option>
                      {fitnessLevel && fitnessLevel.map((data) => (
                      <option key={data.id} value={data.id}>{data.Name}</option>
                      ))}
                    </select>
                    </div>
          </div>
          <div className="col-lg-4 col-sm-12 mt-4">
            <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Fitness Plan
                      </label>
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setFitnessPlanid(e.target.value)}>
                      <option selected>Select Option</option>
                      {fitnessPlan && fitnessPlan.map((data) => (
                      <option key={data.id} value={data.id}>{data.Name}</option>
                      ))}
                    </select>
                    </div>
          </div>
        </div>
        </div>

       {exerciseAllDetails?.data?.exercises?.map((data, index) => (
         <div className="row">
          <span className={bmistye.exerixenameTitle}>
         <h1 className={styles.aboutTitle}>BodyPart : {selectedExcercise}</h1>
         </span> {console.log("data",data)}
            <div className="col-lg-6 col-sm-12 mt-4">
            <Image
              src={data.exercise?.image}
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
         ))}



      </Container>
      <Footer />
    </>
  );
}

export default index;
