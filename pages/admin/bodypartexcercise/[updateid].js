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

  const [bodypartexceriseData, setbodypartexceriseData] = useState("");

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

  const getBodypartexcerise = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessBodypartexcerise/getbyid/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setbodypartexceriseData(data);
      setReps(data.reps);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:4000/api/fitnessBodypartexcerise/updateData/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...bodypartexceriseData, body_part_id: bodypartDataid ,excercise_id : exceriseDataid , fitness_level : fitnessLevelid , fitness_plan:fitnessPlanid , gender: genderid, reps: reps }),
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
      getBodypartexcerise();
    }
    
    getExcerise();
    getBodypart();
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
                      <h2>Update Body-part Excercise</h2>
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
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setBodyPartDataid(e.target.value)}>
                        <option selected>{bodypartexceriseData.body_part_id}</option>
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
                      <option selected>{bodypartexceriseData.excercise_id}</option>
                      {exceriseData && exceriseData.map((data) => (
                      <option value={data._id}>{data.name}</option>
                      ))}
                    </select>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Fitness Level
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setFitnessLevelid(e.target.value)}>
                      <option selected>{bodypartexceriseData.fitness_level}</option>
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
                      <option selected>{bodypartexceriseData.fitness_plan}</option>
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
                      <option selected>{bodypartexceriseData.gender}</option>
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
                        id="reps"
                        name="reps"
                        value={reps}
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
