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

  const [meals, setMeals] = useState([]);
  const [name, setName] = useState("");
  const [fitnessPlan, setFitnessPlan] = useState([{id : "Gain" , Name: "Gain"},{id : "Loss" , Name: "Lose"} ]);
  const [gender, setGender] = useState([{id : "Male" , Name: "Male"},{id : "Female" , Name: "Female"} ]);

  const [fitnessPlanid, setFitnessPlanid] = useState("");
  const [genderid, setGenderid] = useState("");

  const getDetails = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessgoal/getbyid/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setName(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("submit data");
    console.log(name);

    try {
      const res = await fetch(
        `http://localhost:4000/api/fitnessgoal/updateData/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
           body: JSON.stringify({ name: name , fitnessPlan:fitnessPlanid , gender:genderid }),
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setName("");
        setFitnessPlanid("");
        setGenderid("");
        toast.success("Goal Updated successfully");
        history.back();
      } else {
        console.log("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };
 


  useEffect(() => {
    if(id){
      getDetails();
    }
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
              {console.log(name)}
              <div className="col-xl-10">
                <div className="accent-gray">
                  <div className="row pt-4">
                    <div className="col-xl-10">
                      <h2>Update Goal</h2>
                    </div>
                    <div className="col-xl-2">
                       <Link href="/admin/goal">
                        <button type="button" className="btn btn-primary" > <ReplyIcon /> Back </button>
                      </Link>
                    </div>
                  </div>
                  
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Title
                      </label>
                      
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name.name}
                        aria-describedby="emailHelp"
                        onChange={(e) => setName(e.target.value)}
                        minLength={5}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      fitnessPlan
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setFitnessPlanid(e.target.value)}>
                      <option selected>{name.fitnessPlan}</option>
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
                      <option selected>{name.gender}</option>
                      {gender && gender.map((data) => (
                      <option value={data.id}>{data.Name}</option>
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
