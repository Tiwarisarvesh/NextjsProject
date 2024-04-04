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
  const [reps, setReps] = useState("");
  const [bodypartData, setBodyPartData] = useState("");
  const [exceriseData, setExceriseDat] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState([{id : "Beginer" , Name: "Beginer"},{id : "Intermediate" , Name: "Intermediate"},{id : "Advance" , Name: "Advance"} ]);
  const [fitnessPlan, setFitnessPlan] = useState([{id : "Gain" , Name: "Gain"},{id : "Loss" , Name: "Lose"} ]);
  const [gender, setGender] = useState([{id : "Male" , Name: "Male"},{id : "Female" , Name: "Female"} ]);
  
  const [bodypartDataid, setBodyPartDataid] = useState("");
  const [exceriseDataid, setExceriseDatid] = useState("");
  const [fitnessLevelid, setFitnessLevelid] = useState("");
  const [fitnessPlanid, setFitnessPlanid] = useState("");
  const [genderid, setGenderid] = useState("");

  
        
  const getExcerise = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessexcerise/getData`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setExceriseDat(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBodypart = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessBodypart/getData`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setBodyPartData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:4000/api/fitnessBodypartexcerise/insertData",
        {
          method: "POST",
          headers: {
            "X-RapidAPI-Key": "your-rapidapi-key",
            "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
            // "auth-token":
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYmI5YTg0YTA4Mzg1NjI5YWI3N2QyIn0sImlhdCI6MTY4ODk5ODg4MX0.C4t2oec5CZ7FgzJ1mSf2wKrh_qI0_QTXzMzfOW5PLSg",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body_part_id: bodypartDataid ,excercise_id : exceriseDataid , fitness_level : fitnessLevelid , fitness_plan:fitnessPlanid , gender: genderid, reps: reps }),
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setBodyPartDataid("");
        setExceriseDatid("");
        setFitnessLevelid("");
        setFitnessPlanid("");
        setGenderid("");
        setReps("");
        toast.success("Body-part Excerise Created successfully");
        history.back();
      } else {
        console.log("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExcerise();
    getBodypart();
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
                      <h2>Add Body-Part Excercise</h2>
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
                      Select Body-Part
                      </label>
                      {console.log("setBodyPartData",bodypartData)}
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setBodyPartDataid(e.target.value)}>
                      <option selected>Select Option</option>
                      {bodypartData && bodypartData.map((bodypartDatas,index) => (
                      <option value={bodypartDatas._id}>{bodypartDatas.name}</option>
                      ))}
                    </select>
                    </div>
                     <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Select Excerise
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setExceriseDatid(e.target.value)}>
                      <option selected>Select Option</option>
                      {exceriseData && exceriseData.map((data) => (
                      <option value={data._id}>{data.name}</option>
                      ))}
                    </select>
                    </div>
                    {console.log("gender",gender)}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Fitness Level
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setFitnessLevelid(e.target.value)}>
                      <option selected>Select Option</option>
                      {fitnessLevel && fitnessLevel.map((data) => (
                      <option value={data.id}>{data.Name}</option>
                      ))}
                    </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      fitnessPlan
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setFitnessPlanid(e.target.value)}>
                      <option selected>Select Option</option>
                      {fitnessPlan && fitnessPlan.map((data) => (
                      <option value={data.id}>{data.Name}</option>
                      ))}
                    </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Gender
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setGenderid(e.target.value)}>
                      <option selected>Select Option</option>
                      {gender && gender.map((data) => (
                      <option value={data.id}>{data.Name}</option>
                      ))}
                    </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Reps
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        aria-describedby="emailHelp"
                        onChange={(e) => setReps(e.target.value)}
                        minLength={5}
                        required
                      />
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
