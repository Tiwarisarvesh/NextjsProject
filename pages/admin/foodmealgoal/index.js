import React, { useEffect, useState ,useMemo} from "react";
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
      const res = await fetch( `http://localhost:4000/api/fitnessfoodmealgoal/get-meals-goals/`, {
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
      const res = await fetch( `http://localhost:4000/api/fitnessfoodmealgoal/deleteData/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", },
        }
      );
      // const data = await res.json();
      const newMeal = meals?.data.filter((meals) => { return meals._id !== _id })
      setMeals(newMeal)
      alert("delete successfully");
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
                      <h2>All Food Meal Goal</h2>
                    </div>
                    <div className="col-xl-3">
                       <Link href="/admin/foodmealgoal/addNew">
                        <a><button type="button" className="btn btn-primary" > <AddIcon /> Add New </button></a>
                      </Link>
                    </div>
                  </div>

                  <table className="table table-striped table-hover pt-5">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Food</th>
                        <th scope="col">Meal</th>
                        <th scope="col">Goal</th>
                        <th scope="col">Date</th>
                        <th colSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {mealData && mealData?.map((meal, index) => (
                        <tr>
                          <th scope="row" key={meal.id}> {index+1} </th>
                          <td>{meal.foods.name}</td>
                          <td>{meal.meals.name}</td>
                          <td>{meal.goals.name}</td>
                          <td>{meal.date}</td>
                          <td>
                           <Link href={`/admin/foodmealgoal/${meal._id}`}><a><EditIcon sx={{ color: pink[500] }} /> </a></Link>
                          </td>
                          <td>
                            <DeleteIcon sx={{ color: pink[500] }} onClick={e=>handleDelete(meal._id)} />
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
