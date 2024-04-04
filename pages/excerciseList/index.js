import React, {useState ,useEffect} from 'react'
import Image from 'next/image'
import banner1 from '../../public/Banner/Home_banner.jpeg';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import styles from '../../styles/Home.module.css'
import { Container } from "react-bootstrap";
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import ExerciseList from '../../Exercise.json';
import ExerciseDetails from '../../ExerciseDetails.json';
import stylessss from '../excerciseList/excercise.module.css'
// import {useRouter} from 'next/router';
// import 'dotenv/config'
// require('dotenv').config()

function index() {

    // const router = useRouter()
    // console.log("window.location",router)
    // console.log("window.host",process.env.JWT_SECRET)

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

    useEffect(() => {
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
          width={10000}
          height={2000}
          alt="First Slide"
          className='d-block w-100'
        />
        </div>
      </div>
 
 
 
</div>
<Container>
  {/* Step -1 About Section */}
  {/* https://www.strengthlog.com/exercise-directory/ */}
  
  {/* {console.log("ExerciseList",ExerciseList )}
  {console.log("filtered",filteredData)}
  {console.log("filteredDetails",filteredDetails)} */}

  {!UserToken ? <> <span className={stylessss.notlogin}>Sorry You are not Logged in. Please log in and try again</span> <Link href="/login"><a>Click Here Login</a></Link> </>: <>
  <button onClick={selectedExcerciseData} value="1" type="button" className="btn btn-outline-secondary m-2">Chest Exercises</button>
  <button onClick={selectedExcerciseData} value="2" type="button" className="btn btn-outline-secondary m-2">Shoulder Exercises</button>
  <button onClick={selectedExcerciseData} value="3" type="button" className="btn btn-outline-secondary m-2">Bicep Exercises</button>
  <button onClick={selectedExcerciseData} value="4" type="button" className="btn btn-outline-secondary m-2">Triceps Exercises</button>
  <button onClick={selectedExcerciseData} value="5" type="button" className="btn btn-outline-secondary m-2">Leg Exercises</button>
  <button onClick={selectedExcerciseData} value="6" type="button" className="btn btn-outline-secondary m-2">Back Exercises</button>
  <button onClick={selectedExcerciseData} value="7" type="button" className="btn btn-outline-secondary m-2">Glute Exercises</button>
  <button onClick={selectedExcerciseData} value="8" type="button" className="btn btn-outline-secondary m-2">Ab Exercises</button>
  <button onClick={selectedExcerciseData} value="9" type="button" className="btn btn-outline-secondary m-2">Calves Exercises</button>
  <button onClick={selectedExcerciseData} value="10" type="button" className="btn btn-outline-secondary m-2">Forearm Flexors & Grip Exercises</button>
  <button onClick={selectedExcerciseData} value="11" type="button" className="btn btn-outline-secondary m-2">Forearm Extensor Exercises</button>
  <button onClick={selectedExcerciseData} value="12" type="button" className="btn btn-outline-secondary m-2">Cardio Exercises & Equipment</button>
  
  <div className={styles.section}>
  <div className="row">
    <div className="col-lg-3 col-sm-12 mt-4">
    {Array.isArray(filteredData) ? filteredData.map(element => {
            return <div className={stylessss.formcheck}>
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={getChckeboxValue.bind(this)} value={element.userId} />
            <label className={stylessss.label} for="flexRadioDefault2">
                {element.title}
            </label>
        </div>
            
          }) : null}
  
    </div>
    <div className="col-lg-9 col-sm-12 ml-2">
        {Array.isArray(filteredDetails) ? filteredDetails.map(element => {
            return<> <h2 className={stylessss.detailsTitle}>{element.title}</h2>
            <Image
            src={element.image}
            width={800}
            height={500}
            alt="First Slide"
            className={stylessss.image}          />
         
          <div className='row'>
            <div className='col-lg-6 col-sm-12'>
                <h3 className={stylessss.detailsTitle}>{element.Details.title}</h3>
            <Image
            src={element.Details.image}
            width={800}
            height={500}
            alt="First Slide"
            className={stylessss.image}
          />
            </div>
            <div className='col-lg-6 col-sm-12'>
            <h3 className={stylessss.detailsTitle}>{element.titleright}</h3>
            <p>{element.Detailslist.title}</p>
            {Array.isArray(element.Detailslist) ? element.Detailslist.map(element => {
              return <p>{`${element.id} ) ${element.title}`}</p>
            }):null}

            </div>
          </div>
          </>
          })
        : null}
     
      
    
    </div>
  
  
  </div>
  </div></> }
  {/* Step-2 WorkOut Section */}
 
  

  </Container>
<Footer/>
    </>
  )
}

export default index
