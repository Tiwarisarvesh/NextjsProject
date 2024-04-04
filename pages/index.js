import React from 'react'
import Image from 'next/image'
import banner1 from '../public/Banner/Home_banner.jpeg';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import styles from '../styles/Home.module.css'
import { Container } from "react-bootstrap";
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Exercise1 from '../public/exerciseDetails/Air_squat.webp'
import Exercise2 from '../public/exerciseDetails/Barbell_biceps_curl.webp'
import Exercise3 from '../public/exerciseDetails/Dumbbell_Chest_Fly.webp'
import food1 from '../public/abc1.jpg'
import food2 from '../public/abc2.jpg'
import food3 from '../public/abc3.jpg'

function index() {
  return (
    <>
    <Navbar/>
    
     <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
        <Image
          src={banner1}
          width={10000}
          height={4000}
          alt="First Slide"
          className='d-block w-100'
        />
        </div>
      </div>
 
 
  <Link href="/bmi"><a className={`${styles.banner_title} `}  role="button" data-slide="next">
    <span className="btn btn-info">Check BMI</span> </a></Link>
</div>
<Container>
  {/* Step -1 About Section */}
  <div className={styles.section}>
  <div className="row">
     <div>
      <h2 className={`${styles.aboutTitle} p-3`}>About -Health And Diet Chart Plan</h2>
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
      <p className={styles.aboutContent}>
      This online Fitness and diet chart plan Web application is a typical React and next js web application using node and Express. The result obtained by the database is displayed on the data grid, by refreshing the entire web page. Some ways in which this system could be enhanced with additional functionalities are discussed in the section.<br></br>

The project development period had been very fantastic in which we gained tremendous knowledge, the great experience of system development through Fitness and diet chart plan. The splendid co-operation and interest in us led us to develop a worthy system.<br></br>

This Project include all body part & diet plan related all information. This project provide BMI calculate according exercise. . One of the key factors for increasing health is exercise. A regular program of exercise. <br></br><br></br>
      <Link href='/about'><button type='button' className='btn btn-success'>More Details</button></Link>
      </p>
      
    
    </div>
  
  
  </div>
  </div>
  {/* Step-2 WorkOut Section */}
  <div className={styles.section}>
  <div className="row">
     <div>
      <h2 className={`${styles.aboutTitle} p-3`}>WorkOut Details</h2>
     </div>
     
    <div className="col-lg-4 col-sm-12">
    <Card >
    <Image
      src={Exercise1}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
      <Card.Body>
        <Card.Title>Air_squat</Card.Title>
        <Card.Text>
         
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div className="col-lg-4 col-sm-12">
    <Card >
    <Image
      src={Exercise2}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
      <Card.Body>
        <Card.Title>Barbell Biceps Curl</Card.Title>
        <Card.Text>
         
        </Card.Text>
      </Card.Body>
    </Card>
      
    
    </div>
    <div className="col-lg-4 col-sm-12">
    <Card >
    <Image
      src={Exercise3}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
      <Card.Body>
        <Card.Title>Dumbbell Chest Fly</Card.Title>
        <Card.Text>
          
        </Card.Text>
      </Card.Body>
    </Card>
      
    
    </div>
    
  
  </div>

  <Link href="/exercisePost"><button type="button" className={`${styles.btn} btn btn-primary`}>More Details</button></Link>
  </div>
  {/* Step-3 Dieat Details */}
  <div className={styles.section}>
  <div className="row">
     <div>
      <h2 className={`${styles.aboutTitle} p-3`}>Diet Details</h2>
     </div>
     
    <div className="col-lg-4 col-sm-12">
    <Card >
    <Image
      src={food1}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
      <Card.Body>
        <Card.Title>Navy beans</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div className="col-lg-4 col-sm-12">
    <Card >
    <Image
      src={food2}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
      <Card.Body>
        <Card.Title>Black eye peas</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
      
    
    </div>
    <div className="col-lg-4 col-sm-12">
    <Card >
    <Image
      src={food3}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
      <Card.Body>
        <Card.Title>Breadsticks</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
      
    
    </div>
    
  
  </div>

  <Link href="/foodPost"><button type="button" className={`${styles.btn} btn btn-primary`}>More Details</button></Link>
  </div>

  </Container>
<Footer/>
    </>
  )
}

export default index
