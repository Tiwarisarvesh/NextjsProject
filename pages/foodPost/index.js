import React, {useState ,useEffect} from 'react'
import Image from 'next/image'
import banner1 from '../../public/Banner/food.jpg';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import styles12 from '../../styles/Home.module.css'
import { Container } from "react-bootstrap";
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import ExerciseList from '../../Exercise.json';
import ExerciseDetails from '../../ExerciseDetails.json';
import stylessss from '../excerciseList/excercise.module.css'
import styles from '../exercisePost/exercisePost.module.css'
// import {useRouter} from 'next/router';
// import 'dotenv/config'
// require('dotenv').config()

function index() {

    // const router = useRouter()
    // console.log("window.location",router)
    // console.log("window.host",process.env.JWT_SECRET)

    const [foodPost, setFoodPost] = useState();
    const [selectedExcercise, setSelectedExcercise] = useState(1);
    const [filteredData, setfilteredData] = useState(1);
    const [filteredDetails, setfiltereddetails] = useState(1);

    const [UserToken, SetUserToken] = useState();

    const getuserToken = () => {
      // Usertoken
      const UserToken = localStorage.getItem("Usertoken");
      SetUserToken(UserToken);
     }

   const selectedExcerciseData = (e)=> {
    const setSelectedExcerciseValue = e.target.value;
    setSelectedExcercise(setSelectedExcerciseValue);

    const filtered = ExerciseList.filter(employee => {
        // console.log("employee",employee.userId = 1)
        return employee.id == selectedExcercise;
      });

      setfilteredData(filtered);
      
    
}


   const getChckeboxValue=(event)=> {
        const value = event.target.value;

        const filteredDetails = ExerciseDetails.filter(employee => {
            // console.log("employee",employee.userId = 1)
            return employee.userId == value;
          });
          setfiltereddetails(filteredDetails);
        console.log("value",value)
    }

    const getFoodPost = async () => {
        try {
          const res = await fetch(
            `http://localhost:4000/api/fitnessfoodpost/get-food-posts`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json();
          setFoodPost(data);
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        getFoodPost();
        getuserToken();
      }, []);

  return (
    <>
    <Navbar/>

    {/* {console.log("ExerciseList",ExerciseList    )} */}
    {/* {console.log("filteredPeople",filteredPeople    )} */}
     <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
        <Image
          src={banner1}
          width={1500}
          height={400}
          alt="First Slide"
          className='d-block w-100'
        />
        </div>
      </div>
 
 
 
</div>
<Container>
  {/* Step -1 About Section */}
  {/* https://www.strengthlog.com/exercise-directory/ */}
  <h2 className={`${styles12.aboutTitle} p-3`}>Diet Details</h2>
  {!UserToken ? <> <span className={styles12.notlogin}>Sorry You are not Logged in. Please log in and try again</span> <Link href="/login"><a>Click Here Login</a></Link> </> : <>
  {foodPost?.data?.map((data, index) => (
    <div className={styles.headeing}>
  <div className='row'>
    <div className='col-lg-6 col-sm-12 mt-4'>
    <h3>Gender : {data.gender}</h3>
        <h3>Food  : {data.food.name}</h3>
        <h3>Category  : {data.category}</h3>
        <h5>description : {data.description}</h5>
    </div>
    <div className='col-lg-6 col-sm-12 mt-4'>
    <Image
          src={data.image}
          width={500}
          height={300}
          alt="First Slide"
          className='d-block w-100'
        />
       
    </div>

  </div>
  </div>
   ))}
   </>}
  
  {/* Step-2 WorkOut Section */}
 
  

  </Container>
<Footer/>
    </>
  )
}

export default index
