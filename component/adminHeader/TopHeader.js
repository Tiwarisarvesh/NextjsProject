import React from "react";
import Link from "next/link";
import styles from "../adminHeader/adminHeader.module.css";
import { useRouter } from 'next/router';

function TopHeader() {
  
  const router = useRouter()

  const handleLogout = async(e) => {
    e.preventDefault();
    console.log("handleLogout")
    const removeToken = localStorage.removeItem("token");

    const Token = localStorage.getItem('token')
    if(!Token) {
      router.push("/admin/login");
    }
  }

  return (
    <>
    <div className="abc">
    <nav className={`${styles.TopHeadercss} navbar navbar-expand-lg bg-body-tertiary`}>
  <div className="container-fluid">
    <Link href="/admin/dashboard"><a className={`${styles.headerTitle} navbar-brand`}>Health And Diet Chart Plan</a></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#"></a>
        </li>

      </ul>
      <form className="d-flex" role="search">
       <p>Welcome : Sarvesh Tiwari</p>
       <button onClick={handleLogout}><span className={styles.logout}> - (Logout)</span></button> 
      </form>
    </div>
  </div>
   </nav>
   </div>
    </>
  );
}

export default TopHeader;
