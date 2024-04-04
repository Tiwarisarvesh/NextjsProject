import React, { useEffect, useState,useMemo } from "react";
import AdminHader from "../../../component/adminHeader";
import AdminTopHeader from "../../../component/adminHeader/TopHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { pink } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import "reactjs-popup/dist/index.css";
import Image from 'next/image'
import Link from "next/link";
import {toast} from "react-toastify";
// import Pagination from "../../../component/common/Pagination";
import main from '../../../styles/Home.module.css'
import PaginationTest from '../../../component/Pagination'

let PageSize = 8;

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
      const res = await fetch( `http://localhost:4000/api/fitnessfoodpost/getData`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setMeals(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async(_id)=> {
    // console.log("delete",_id);
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessfoodpost/deleteData/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", },
        }
      );
      // const data = await res.json();
      const newMeal = meals.filter((meals) => { return meals._id !== _id })
      setMeals(newMeal)
      alert("delete successfully");
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
                      <h2>All Nutrition Post</h2>
                    </div>
                    <div className="col-xl-3">
                       <Link href="/admin/nutritionpost/addNew">
                        <a><button type="button" className="btn btn-primary" > <AddIcon /> Add New </button></a>
                      </Link>
                    </div>
                  </div>

                  <table className="table table-striped table-hover pt-5">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Gender</th>
                        <th scope="col">description</th>
                        <th scope="col">Date</th>
                        <th colSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log("meals",meals)}
                      {mealData.map((meal, index) => (
                        <tr>
                          <th scope="row" key={meal.id}> {index+1} </th>
                          <td> <Image
                          fill="true"
                            src={meal.image}
                            width={50}
                            height={50}
                            alt="Picture of the author"
                            className={main.img}
                          /></td>
                          <td>{meal.category}</td>
                          <td>{meal.gender}</td>
                          <td>{meal.description}</td>
                          <td>{meal.date}</td>
                          <td>
                           <Link href={`/admin/nutritionpost/${meal._id}`}><a><EditIcon sx={{ color: pink[500] }} /> </a></Link>
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
