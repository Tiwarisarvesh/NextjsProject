import React, { useEffect, useState ,useMemo } from "react";
import AdminHader from "../../../component/adminHeader";
import AdminTopHeader from "../../../component/adminHeader/TopHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { pink } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import ReplyIcon from "@mui/icons-material/Reply";
import Link from "next/link";
// import UpdateData from "./[updateid]";
import {toast} from "react-toastify";
// import Pagination from "../../../component/common/Pagination";
import PaginationTest from '../../../component/Pagination'

let PageSize = 13;

function index() {
  const [meals, setMeals] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);

  const mealData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return meals.slice(firstPageIndex, lastPageIndex);
  });

  
  const getData = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessBodypartexcerise/FetchAllDetails/`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setMeals(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async(_id)=> {
    // console.log("delete",_id);
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessBodypartexcerise/deleteData/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", },
        }
      );
      // const data = await res.json();
      console.log("meals",meals)
      const newMeal = meals.data.filter((meals) => { return meals._id !== _id })
      setMeals(newMeal)
      confirm("delete successfully");
      getData();
      toast.success("Delete successfully");
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getData();
  }, []);
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
                    <div className="col-xl-9">
                      <h2>All Body-Part Excercise</h2>
                    </div>
                    <div className="col-xl-3">
                       <Link href="/admin/bodypartexcercise/addNew">
                        <a><button type="button" className="btn btn-primary" > <AddIcon /> Add New </button></a>
                      </Link>
                    </div>
                  </div>

                  <table className="table table-striped table-hover pt-5">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Exercise</th>
                        <th scope="col">Body-Part</th>
                        <th scope="col">Fitness Level</th>
                        <th scope="col">Fitness Plan</th>
                        <th scope="col">Gender</th>
                        <th colSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log("meals",meals)}
                      {mealData?.map((meal, index) => (
                        <tr key={meal._id}>
                          {console.log("meal",meal)}
                          <th scope="row"> {index+1} </th>
                          <td> {meal.exercise.name} </td>
                          <td>{meal.bodypart.name}</td>
                          <td>{meal.fitness_level}</td>
                          <td>{meal.fitness_plan}</td>
                          <td>{meal.gender}</td>
                          <td>
                           <Link href={`/admin/bodypartexcercise/${meal._id}`}><a><EditIcon sx={{ color: pink[500] }} /> </a></Link>
                          </td>
                          <td>
                            <DeleteIcon sx={{ color: pink[500] }} onClick={(e)=>handleDelete(meal._id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <PaginationTest
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={meals.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                  />
                  {/* <Pagination name={meals.length}/> */}
                  
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
