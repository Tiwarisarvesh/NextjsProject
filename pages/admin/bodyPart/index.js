import React, { useEffect, useState,useMemo } from "react";
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
import UpdateData from "./[updateid]";
import {toast} from "react-toastify";
// import Pagination from "../../../component/common/Pagination";
import PaginationTest from '../../../component/Pagination'

let PageSize = 13;

function index() {
  const [bodyPart, setBodyPart] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const mealData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return bodyPart.slice(firstPageIndex, lastPageIndex);
  });
  
  
  const getData = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessBodypart/getData`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setBodyPart(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async(_id)=> {
     console.log("delete",_id);
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessBodypart/deleteData/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", },
        }
      );
      // const data = await res.json();
      const newbodyPart = bodyPart.filter((bodyPart) => { return bodyPart._id !== _id })
      setBodyPart(newbodyPart)
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
                      <h2>All Body Part</h2>
                    </div>
                    <div className="col-xl-3">
                       <Link href="/admin/bodyPart/addNew">
                        <a><button type="button" className="btn btn-primary" > <AddIcon /> Add New </button></a>
                      </Link>
                    </div>
                  </div>

                  <table className="table table-striped table-hover pt-5">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th colSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mealData.map((bodyParts, index) => (
                        <tr>
                          <th scope="row" key={bodyParts.id}> {index+1} </th>
                          <td>{bodyParts.name}</td>
                          <td>{bodyParts.date}</td>
                          <td>
                           <Link href={`/admin/bodyPart/${bodyParts._id}`}><a><EditIcon sx={{ color: pink[500] }} /> </a></Link>
                          </td>
                          <td>
                            <DeleteIcon sx={{ color: pink[500] }} onClick={e=>handleDelete(bodyParts._id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>


                  <PaginationTest
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={bodyPart.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                  />
                  {/* <Pagination name={bodyPart.length}/> */}
                  
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
