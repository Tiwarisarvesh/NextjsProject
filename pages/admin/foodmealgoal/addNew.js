import React, { useEffect, useState } from "react";
import AdminHader from "../../../component/adminHeader";
import AdminTopHeader from "../../../component/adminHeader/TopHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { pink } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";
import {toast} from "react-toastify";

function index() {
  // const [name, setName] = useState({title: "", description: "", tag: ""})
  const [foodData, setFoodData] = useState("");
  const [mealData, setMealData] = useState("");
  const [goal, setGoalData] = useState("");
  
  const [foodDataid, setFoodDataid] = useState("");
  const [mealDataid, setMealDataid] = useState("");
  const [goalid, setGoalDataid] = useState("");
//   const [bodypartData, setBodyPartData] = useState("");
//   const [exceriseData, setExceriseDat] = useState("");
//   const [fitnessLevel, setFitnessLevel] = useState("");
  
//   const [bodypartDataid, setBodyPartDataid] = useState("");
//   const [exceriseDataid, setExceriseDatid] = useState("");
//   const [fitnessLevelid, setFitnessLevelid] = useState("");
  
  
        
  const getFood = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessfood/getData`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setFoodData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMeal = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessmeal/getData`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setMealData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getGoal = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessgoal/getData`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setGoalData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:4000/api/fitnessfoodmealgoal/insertData",
        {
          method: "POST",
          headers: {
            "X-RapidAPI-Key": "your-rapidapi-key",
            "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
            // "auth-token":
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYmI5YTg0YTA4Mzg1NjI5YWI3N2QyIn0sImlhdCI6MTY4ODk5ODg4MX0.C4t2oec5CZ7FgzJ1mSf2wKrh_qI0_QTXzMzfOW5PLSg",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ food_id: foodDataid ,meal_id : mealDataid , goal_id : goalid}),
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setFoodDataid("");
        setMealDataid("");
        setGoalDataid("");
        toast.success("Created successfully");
        history.back();
      } else {
        console.log("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFood();
    getMeal();
    getGoal();
  }, []);
  //   const onChange = (e)=>{
  //     console.log(e)
  //     setNote({[e.target.name]: e.target.value})
  // }
  return (
    <>
      <div>
        <AdminTopHeader />
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="row">
              <div className="col-auto">
                <AdminHader />
              </div>
              <div className="col-xl-10">
                <div className="accent-gray">
                  <div className="row pt-4">
                    <div className="col-xl-10">
                      <h2>Add Food Meal Goal</h2>
                    </div>
                    <div className="col-xl-2">
                       <Link href="/admin/foodmealgoal">
                        <button type="button" className="btn btn-primary" > <ReplyIcon /> Back </button>
                      </Link>
                    </div>
                  </div>
                  <form>
                   
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Select Food
                      </label>
                      {console.log("goal",goal)}
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setFoodDataid(e.target.value)}>
                      <option selected>Select Option</option>
                      {foodData && foodData.map((data,index) => (
                      <option value={data._id}>{data.name}</option>
                      ))}
                    </select>
                    </div>
                     <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Select Meal
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setMealDataid(e.target.value)}>
                      <option selected>Select Option</option>
                      {mealData && mealData.map((data) => (
                      <option value={data._id}>{data.name}</option>
                      ))}
                    </select>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Fitness Goal
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setGoalDataid(e.target.value)}>
                      <option selected>Select Option</option>
                      {goal && goal.map((data) => (
                      <option value={data._id}>{data.name}</option>
                      ))}
                    </select>
                    </div> 

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleClick}
                    >
                      {" "}
                      <AddIcon /> Add New
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
