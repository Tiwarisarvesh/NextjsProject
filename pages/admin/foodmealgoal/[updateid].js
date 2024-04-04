import React, { useEffect, useState } from "react";
import AdminHader from "../../../component/adminHeader";
import AdminTopHeader from "../../../component/adminHeader/TopHeader";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRouter } from 'next/router';
import {toast} from "react-toastify";


function index() {
  
  const router = useRouter();
  const id = router.query.updateid;

  const [getFoodMealGoalData, setGetFoodMealGoalData] = useState("");

  
  const [food, setFood] = useState("");
  const [meal, setMeal] = useState("");
  const [goal, setGoal] = useState("");


  const [foodid, setFoodid] = useState("");
  const [mealid, setMealid] = useState("");
  const [goalid, setGoalid] = useState("");
 
  const getFood = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessfood/getData`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setFood(data);
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
      setMeal(data);
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
      setGoal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFoodMealGoal = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessfoodmealgoal/getbyid/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setGetFoodMealGoalData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:4000/api/fitnessfoodmealgoal/updateDat/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ food_id: foodid ,meal_id : mealid , goal_id : goalid}),
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setFoodid("");
        setMealid("");
        setGoalid("");
        toast.success("Updated successfully");
        history.back();
      } else {
        console.log("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };
 


  useEffect(() => {
    if(id) {
        getFoodMealGoal();
    }
    
    getFood();
    getGoal();
    getMeal();
  }, [id]);
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
                      <h2>Update Food Meal Goal</h2>
                    </div>
                    <div className="col-xl-2">
                       <Link href="/admin/bodypartexcercise">
                        <button type="button" className="btn btn-primary" > <ReplyIcon /> Back </button>
                      </Link>
                    </div>
                  </div>
                 
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Select Food
                      </label>
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setFoodid(e.target.value)}>
                        <option selected>{getFoodMealGoalData.food_id}</option>
                        {food && food.map((data,index) => (
                        <option value={data._id}>{data.name}</option>
                        ))}
                    </select>
                    </div>
                     <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Select Meal
                      </label>
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setMealid(e.target.value)}>
                      <option selected>{getFoodMealGoalData.meal_id}</option>
                        {meal && meal.map((data) => (
                        <option value={data._id}>{data.name}</option>
                        ))}
                    </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Fitness Goal
                      </label>
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setGoalid(e.target.value)}>
                      <option selected>{getFoodMealGoalData.goal_id}</option>
                        {goal && goal.map((data) => (
                        <option value={data._id}>{data.fitnessPlan}</option>
                        ))}
                    </select>
                    </div>
                   
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleClick}
                    >
                      {" "}
                      <AddIcon /> Update
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
