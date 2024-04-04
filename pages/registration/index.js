import React, {useState ,useEffect} from 'react'
import Image from 'next/image'
import banner1 from '../../public/login/RegisterBanner.jpg';
import Logo from '../../public/login/RegisterNow_small_2.jpeg';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import styles from '../registration/registration.module.css'
import { Container } from "react-bootstrap";
import Link from 'next/link';
import {toast} from "react-toastify";

function index() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  const [Errorname, setErrorName] = useState("");
  const [Erroremail, setErrorEmail] = useState("");
  const [Errorpassword, setErrorPassword] = useState("");
  const [Errornumber, setErrorNumber] = useState("");

  const [emailexsit, setemailexsit] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    if(name === ""){
      setErrorName("UserName is required")
    }
    if(number === ""){
      setErrorNumber("Number is required")
    }
    if(email === ""){
      setErrorEmail("Email is required")
    }
    if(password === ""){
     setErrorPassword("Password is required")
    }
    try {
      const res = await fetch(
        "http://localhost:4000/api/authUser/createuser",
        {
          method: "POST",
          headers: {
            "X-RapidAPI-Key": "your-rapidapi-key",
            "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
            // "auth-token":
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYmI5YTg0YTA4Mzg1NjI5YWI3N2QyIn0sImlhdCI6MTY4ODk5ODg4MX0.C4t2oec5CZ7FgzJ1mSf2wKrh_qI0_QTXzMzfOW5PLSg",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name , email:email , password: password , number : number}),
        }
      );
      let resJson = await res.json();

    //   console.log("resJson",resJson.authToken);
       localStorage.setItem('authToken', JSON.stringify(resJson.authToken));
      if (res.status === 200) {
        setName("");
        setEmail("");
        setPassword("");
        setNumber("");
        setemailexsit("")
        toast.success("Registration successfully");
        // history.back();
      } else {
        console.log("Some error occured");
        toast.warn("Email Already Exists");
        setemailexsit("Email Already Exists")
      }

    } catch (error) {
      console.log(error);
      console.log("error",error)
    }
  };

  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem('authToken'));
    // console.log("authToken",items)
  }, []);

  return (
    <>
    <Navbar/>
    
     <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
        <Image
          src={banner1}
          width={3000}
          height={500}
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
     <div className="col-lg-4 col-sm-12">
    
      
     </div>
     
    <div className="col-lg-4 col-sm-12">
    <Image
      src={Logo}
      className={styles.aboutTitle}
      width={500}
      height={100}
      alt="Picture of the author"
    />
    </div>
    <div className="col-lg-4 col-sm-12">
   
    </div>
  
  
  </div>
  <div className="row">
     <div className="col-lg-4 col-sm-12">
   
      
     </div>
     
    <div className="col-lg-4 col-sm-12">
    {/* <h2 className={`${styles.aboutTitle} p-2`}>Registration</h2> */}
    </div>
    <div className="col-lg-4 col-sm-12">
   
    </div>
  
  
  </div>
  <div className="row">
     <div className="col-lg-4 col-sm-12">
    
      
     </div>
     
    <div className="col-lg-4 col-sm-12">
    <form>
    <div className="mb-3">
    <label htmlFor="name" className="form-label"> UserName </label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} minLength={5} required />
    <span className={styles.error}>{Errorname}</span>
   </div>
    <div className="mb-3">
    <label htmlFor="name" className="form-label"> Email </label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} minLength={5} required />
    {/* {emailexsit? <div> <span className={styles.error}>Error! Email Already Exists. </span> </div> : "" } */}
    <span className={styles.error}>{Erroremail}</span>
   </div>
    <div className="mb-3">
    <label htmlFor="name" className="form-label"> Password </label>
    <input type="password" className="form-control" id="password" name="password" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} minLength={5} required />
    <span className={styles.error}>{Errorpassword}</span>
   </div>
    <div className="mb-3">
    <label htmlFor="name" className="form-label"> Number </label>
    <input type="number" className="form-control" id="password" name="password" aria-describedby="emailHelp" onChange={(e) => setNumber(e.target.value)} minLength={5} required />
    <span className={styles.error}>{Errornumber}</span>
   </div>
   </form>
   <Link href="/login"><a>if You are already register you can login</a></Link> <br></br><br></br>
    <button type="button" className="btn btn-primary mb-5" onClick={handleClick}>Submit</button>
    </div>
    <div className="col-lg-4 col-sm-12">
    
    </div>
  
  
  </div>
 
  </div>
  
  

  </Container>
<Footer/>
    </>
  )
}

export default index
