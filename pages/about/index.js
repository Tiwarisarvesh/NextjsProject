import React from 'react'
import Image from 'next/image'
import banner1 from '../../public/Banner/about.webp';
import aboutus_image from '../../public/aboutus.jpg';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import styles from '../../styles/Home.module.css'
import { Container } from "react-bootstrap";
import Link from 'next/link';
import Card from 'react-bootstrap/Card';

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
          height={2000}
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
      <h2 className={`${styles.aboutTitle} p-3`}>About us</h2>
     </div>
     
    <div className="col-lg-6 col-sm-12">
    <Image
      src={aboutus_image}
      className={styles.aboutClass}
      width={600}
      height={400}
      alt="Picture of the author"
    />
    </div>
    <div className="col-lg-6 col-sm-12">
      <p className={styles.aboutContent}>
      This online Fitness and diet chart plan Web application is a typical React and next js web application using node and Express. The result obtained by the database is displayed on the data grid, by refreshing the entire web page. Some ways in which this system could be enhanced with additional functionalities are discussed in the section.</p>
      
      <p className={styles.aboutContent}>The project development period had been very fantastic in which we gained tremendous knowledge, the great experience of system development through Fitness and diet chart plan. The splendid co-operation and interest in us led us to develop a worthy system.</p> 

      <p className={styles.aboutContent}> This Project include all body part & diet plan related all information. This project provide BMI calculate according exercise. . One of the key factors for increasing health is exercise. A regular program of exercise.</p>
      <Link href='/about'><button type='button' className='btn btn-success'>More Details</button></Link>
      
    </div>
  
  
  </div>
  </div>
  {/* Step-2 WorkOut Section */}
  <div className={styles.section}>
  <div className="row">
     <div>
      <h2 className={`${styles.aboutTitle} p-3`}>Physical Health</h2>
     </div>
     
    <div className="col-lg-12 col-sm-12">
    <p className={styles.aboutContent}> A person who has good physical health is likely to have bodily functions and processes working at their peak.</p>

    <p className={styles.aboutContent}>This is not only due not only to an absence of disease. Regular exercise, balanced nutrition, and adequate rest all contribute to good health. People receive medical treatment to maintain the balance, when necessary.</p>

    <p className={styles.aboutContent}> Physical well-being involves pursuing a healthful lifestyle to decrease the risk of disease. Maintaining physical fitness, for example, can protect and develop the endurance of a person’s breathing and heart function, muscular strength, flexibility, and body composition.</p>

    <p className={styles.aboutContent}> Looking after physical health and well-being also involves reducing the risk of an injury or health issue, such as:</p>

          minimizing hazards in the workplace
          using contraception when having sex
          practicing effective hygiene
          avoiding the use of tobacco, alcohol, or illegal drugs
          taking the recommended vaccines for a specific condition or country when traveling
    <p className={styles.aboutContent}> Good physical health can work in tandem with mental health to improve a person’s overall quality of life.</p>

    <p className={styles.aboutContent}> For example, mental illness, such as depression, may increase the risk of drug use disorders, according to a 2008 studyTrusted Source. This can go on to adversely affect physical health.</p>
    </div>
  
  </div>

  </div>
  <div className={styles.section}>
  <div className="row">
     <div>
      <h2 className={`${styles.aboutTitle} p-3`}>Mental health</h2>
     </div>
     
    <div className="col-lg-12 col-sm-12">
    <p className={styles.aboutContent}>According to the U.S. Department of Health & Human Services,Trusted Source mental health refers to a person’s emotional, social, and psychological well-being. Mental health is as important as physical health as part of a full, active lifestyle.</p>

    <p className={styles.aboutContent}>It is harder to define mental health than physical health because many psychological diagnoses depend on an individual’s perception of their experience.</p>

    <p className={styles.aboutContent}>With improvements in testing, however, doctors are now able to identify some physical signs of some types of mental illness in CT scans and genetic tests.</p>

    <p className={styles.aboutContent}>Good mental health is not only categorized by the absence of depression, anxiety, or another disorder. It also depends on a person’s ability to:</p>

    enjoy life
    bounce back after difficult experiences and adapt to adversity
    balance different elements of life, such as family and finances
    feel safe and secure
    achieve their full potential
    Physical and mental health have strong connections. For example, if a chronic illness affects a person’s ability to complete their regular tasks, it may lead to depression and stress. These feelings could be due to financial problems or mobility issues.

    <p className={styles.aboutContent}>A mental illness, such as depression or anorexia, can affect body weight and overall function.</p>

    <p className={styles.aboutContent}>It is important to approach “health” as a whole, rather than as a series of separate factors. All types of health are linked, and people should aim for overall well-being and balance as the keys to good health.</p>
    </div>
  
  </div>

  </div>
  

  </Container>
<Footer/>
    </>
  )
}

export default index
