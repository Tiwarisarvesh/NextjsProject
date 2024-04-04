import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../adminHeader/adminHeader.module.css";
import Dashboard from "../../public/admin_image/dashboard_icon.png";

function index() {
  return (
    <>
      <div className="col-auto bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 d-none d-sm-inline">Menu</span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className={styles.navbar}>
              {/* <Image
                src={Dashboard}
                className="sarvesh"
                width={15}
                height={15}
                alt="Picture of the author"
              /> */}
              <Link href="/admin/dashboard" className={styles.sarvesh}>
                Dashboard
              </Link>
            </li>

            {/* <div class={styles.dropdown}>
            <button class={styles.dropbtn}>Exercise List <ExpandMoreIcon/></button>
           <div class={styles.dropdowncontent}>
            
           
            
            </div>
          </div> */}
           
          <li className={styles.navbar}>
              <Link
                href="/admin/exerices"
                className="nav-link px-0 align-middle"
              >
                Exerices
              </Link>
            </li>            
            <li className={styles.navbar}>
              <Link href="/admin/bodyPart" className="nav-link px-0 align-middle">
                Bodypart
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/equipment" className="nav-link px-0 align-middle">
              Equipment
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/excercisepost" className="nav-link px-0 align-middle">
              Excercise Post
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/bodypartexcercise" className="nav-link px-0 align-middle">
              Body Part Excercise
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/meal" className="nav-link px-0 align-middle">
                Meal
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/goal" className="nav-link px-0 align-middle">
                Goal
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/food" className="nav-link px-0 align-middle">
                Food
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/foodmealgoal" className="nav-link px-0 align-middle">
              Food Meal Goal
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/nutritionpost" className="nav-link px-0 align-middle">
              Nutrition Post
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/contactUs" className="nav-link px-0 align-middle">
              Contact Us
              </Link>
            </li>
            <li className={styles.navbar}>
              <Link href="/admin/user" className="nav-link px-0 align-middle">
                User
              </Link>
            </li>
            


          </ul>
          
        </div>
      </div>
    </>
  );
}

export default index;
