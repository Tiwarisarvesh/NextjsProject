import React, { useEffect, useState } from "react";
import AdminHader from "../../../component/adminHeader";
import AdminTopHeader from "../../../component/adminHeader/TopHeader";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRouter } from 'next/router';
import {toast} from "react-toastify";
import Image from 'next/image';
import main from '../../../styles/Home.module.css';
import axios from "axios";


function index() {
  
  const router = useRouter();
  const id = router.query.updateid;

  const [excerisePostData, setExcerisePostData] = useState("");

  const [description, setDescription] = useState("");
  const [bodypart, setBodyPart] = useState("");
  const [excercise, setexcercise] = useState("");
  const [gender, setGender] = useState([{id : "Male" , Name: "Male"},{id : "Female" , Name: "Female"} ]);

  const [genderid, setGenderid] = useState("");
  const [bodypartid, setBodyPartid] = useState("");
  const [excerciseid, setexcerciseid] = useState("");

  const [uploadedImages, setUploadedImages] = useState([]);
  const [imgUrl, setImgURL] = useState([]);

  // Image Function
  const addImage = async(e) =>{
    e.preventDefault()
    await sendFileToIPFS(uploadedImages)
  }

  // Set Image and Get URL
  const sendFileToIPFS = async (fileImg) => {
    
    if (fileImg) {
      try {
        
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `702d372aca9ab85b1cd6`,
            pinata_secret_api_key: `f41e7f070ef5c1456114ba03942ec6760f4f0feab70367c63603d937ffa33c69`,
            "Content-Type": "multipart/form-data",
          },
        });
        
        console.log(resFile.data.IpfsHash, "<-----hash");

      //  const url = {`https://ipfs.io/ipfs/${resFile.data.IpfsHash}`};
      const url = "https://ipfs.io/ipfs/"+resFile.data.IpfsHash;
      setImgURL(url);
      
        // setNftHash(resFile.data.IpfsHash);
        
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const getDetails = async () => {
    try {
      const res = await fetch( `http://localhost:4000/api/fitnessexcercisepost/getbyid/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", },
        }
      );
      const data = await res.json();
      setExcerisePostData(data);
      setDescription(data.description)
    } catch (err) {
      console.log(err);
    }
  };

  const getBodypart = async () => {
    try {
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

  const getExcercise = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/fitnessexcerise/getData`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setexcercise(data);
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
        `http://localhost:4000/api/fitnessexcercisepost/updateData/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gender: genderid, image: imgUrl , description : description, body_part_id :bodypartid , excercise_id : excerciseid }),
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setDescription("");
        setGenderid("");
        setBodyPartid("");
        setexcerciseid("");
        setImgURL();
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
      getDetails();
    }
    getBodypart();
    getExcercise();
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
                      <h2>Update Exerices</h2>
                    </div>
                    <div className="col-xl-2">
                       <Link href="/admin/excercisepost">
                        <button type="button" className="btn btn-primary" > <ReplyIcon /> Back </button>
                      </Link>
                    </div>
                  </div>
                 
                  <form>
                    <div className="mb-3 pt-4">
                    {(excerisePostData.image === "imgURL") ? excerisePostData.image :
                          excerisePostData.image &&  
                             <Image
                            src={excerisePostData.image}
                            width={50}
                            height={50}
                            alt="Picture of the author"
                            className={main.img}
                          /> } 
                    </div>

                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Body Part
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setBodyPartid(e.target.value)}
                      >
                        <option>{excerisePostData.body_part_id}</option>
                        {bodypart &&
                          bodypart.map((data,i) => (
                            <option value={data._id} key={i + 1}>
                              {data.name}
                            </option>
                          ))}
                        {/* <option value="Female">Female</option>
                      <option value="Other">Other</option> */}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Excercise
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setexcerciseid(e.target.value)}
                      >
                        <option>{excerisePostData.excercise_id}</option>
                        {excercise &&
                          excercise.map((data,i) => (
                            <option value={data._id} key={i + 1}>
                              {data.name}
                            </option>
                          ))}
                        {/* <option value="Female">Female</option>
                      <option value="Other">Other</option> */}
                      </select>
                    </div>


                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                      Gender
                      </label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setGenderid(e.target.value)}>
                      <option selected>{excerisePostData.gender}</option>
                      {gender && gender.map((data) => (
                      <option value={data.id}>{data.Name}</option>
                      ))}
                    </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={description}
                        name="name"
                        aria-describedby="emailHelp"
                        onChange={(e) => setDescription(e.target.value)}
                        minLength={5}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Image
                      </label>
                      <form
                        id="formFile"
                        encType="multipart/form-data"
                        onSubmit={() => {
                          sendFileToIPFS;
                        }}
                      >
                        <input className="form-control" type="file" id="formFile" onChange={(e) => setUploadedImages(e.target.files[0])}/>
                        <button type="submit" onClick={addImage}>Add Image</button>
                        {/* {isLoading ? "Done" : "Uploading"} */}
                      </form>
                      
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
