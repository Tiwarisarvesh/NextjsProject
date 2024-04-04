'use client';

import React, {useState ,useEffect} from 'react'
import Image from 'next/image'
import banner1 from '../../../public/Banner/Home_banner.jpeg';
import Navbar from '../../../component/Navbar';
import Footer from '../../../component/Footer';
import styles from '../../../styles/Home.module.css'
import { Container } from "react-bootstrap";
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import {toast} from "react-toastify";
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
// import { useNavigate } from 'react-router-dom'

function index() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();
  const router = useRouter()

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/login",
        {
          method: "POST",
          headers: {
            "X-RapidAPI-Key": "your-rapidapi-key",
            "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYmI5YTg0YTA4Mzg1NjI5YWI3N2QyIn0sImlhdCI6MTY4ODk5ODg4MX0.C4t2oec5CZ7FgzJ1mSf2wKrh_qI0_QTXzMzfOW5PLSg",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email:email , password: password }),
        }
      );
      const resJson = await res.json();
      const LoginToken = resJson.authtoken;
      
      console.log("LoginToken" ,JSON.stringify(LoginToken) );
     
      localStorage.setItem('token', LoginToken);
      
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        // localStorage.setItem('token', json.authtoken); 
        router.push("/admin/dashboard");
        // redirect('/');
        toast.success("Login successfully");
        // history.back();
      } else {
        console.log("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Perform localStorage action
    const Token = localStorage.getItem('token')
    if(Token) {
      router.push("/admin/dashboard");
    }
  }, [])

  return (
    <>
    <Navbar/>
    
     <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {/* <div className="carousel-item active">
        <Image
          src={banner1}
          width={10000}
          height={1000}
          alt="First Slide"
          className='d-block w-100'
        />
        </div> */}
      </div>
 
 
 
</div>
<Container>
  {/* Step -1 About Section */}
  <div className={styles.section}>
  <div className="row">
     <div>
      
      <h2 className={`${styles.aboutTitle} p-2`}>Admin - Login</h2>
     </div>
     
    {/* <div className="col-lg-6 col-sm-12">
    <Image
      src={banner1}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
    </div> */}
    <div className="col-lg-8 col-sm-12">
    <form>
    <div className="mb-3">
    <label htmlFor="name" className="form-label"> Email </label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} minLength={5} required />
   </div>
    <div className="mb-3">
    <label htmlFor="name" className="form-label"> Password </label>
    <input type="password" className="form-control" id="password" name="password" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} minLength={5} required />
   </div>
   </form>
   <Link href="/registration"><a>Create New Account</a></Link> <br></br><br></br>
<button type="button" className="btn btn-primary" onClick={handleClick}>Submit</button>
    </div>
  
  
  </div>
  </div>
  
  

  </Container>
<Footer/>
    </>
  )
}

export default index
