import React, {useState} from 'react'
import Image from 'next/image'
import banner1 from '../../public/Banner/Home_banner.jpeg';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import styles from '../../styles/Home.module.css'
import { Container } from "react-bootstrap";
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import {toast} from "react-toastify";

function index() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [goal, setGoal] = useState("");
  const [Comment, setComment] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("submit data");
    console.log(name);

    try {
      const res = await fetch(
        "http://localhost:4000/api/contactus/insertData",
        {
          method: "POST",
          headers: {
            "X-RapidAPI-Key": "your-rapidapi-key",
            "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYmI5YTg0YTA4Mzg1NjI5YWI3N2QyIn0sImlhdCI6MTY4ODk5ODg4MX0.C4t2oec5CZ7FgzJ1mSf2wKrh_qI0_QTXzMzfOW5PLSg",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name , email:email , number: number , goal:goal , comment:Comment }),
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setName("");
        setEmail("");
        setNumber("");
        setGoal("");
        setComment("");
        toast.success("Contact Us Created successfully");
        // history.back();
      } else {
        console.log("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar/>
    
     <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
        <Image
          src={banner1}
          width={10000}
          height={1000}
          alt="First Slide"
          className='d-block w-100'
        />
        </div>
      </div>
 
 
 
</div>
<Container>
  {/* Step -1 About Section */}
  <div className={styles.section}>
  <div className="row">
     <div>
      <h2 className={`${styles.aboutTitle} p-2`}>Contact Us</h2>
     </div>
     
    <div className="col-lg-6 col-sm-12">
    <Image
      src={banner1}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
    </div>
    <div className="col-lg-6 col-sm-12">
    <form>
    <div class="mb-3">
    <label htmlFor="name" className="form-label"> Name </label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} minLength={5} required />
   </div>
    <div class="mb-3">
    <label htmlFor="name" className="form-label"> Email </label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} minLength={5} required />
   </div>
    <div class="mb-3">
    <label htmlFor="name" className="form-label"> Number </label>
    <input type="text" className="form-control" id="number" name="number" aria-describedby="emailHelp" onChange={(e) => setNumber(e.target.value)} minLength={5} required />
   </div>
    <div class="mb-3">
    <label htmlFor="name" className="form-label"> Goal </label>
    <input type="text" className="form-control" id="goal" name="goal" aria-describedby="emailHelp" onChange={(e) => setGoal(e.target.value)} minLength={5} required />
   </div>
   </form>
   
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setComment(e.target.value)}></textarea>
</div>      
<button type="button" class="btn btn-primary" onClick={handleClick}>Submit</button>
    </div>
  
  
  </div>
  </div>
  
  

  </Container>
<Footer/>
    </>
  )
}

export default index
