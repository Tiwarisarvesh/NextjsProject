import React, { useEffect, useState } from "react";
import AdminHader from "../../../component/adminHeader";
import AdminTopHeader from "../../../component/adminHeader/TopHeader";
import "reactjs-popup/dist/index.css";
import {toast} from "react-toastify";
import styles from '../dashboard/dashboard.module.css'
import { useRouter } from 'next/router';

function index() {
 
  const router = useRouter()
 
  useEffect(() => {
    // Perform localStorage action
    const Token = localStorage.getItem('token')
    if(!Token) {
      router.push("/admin/login");
    }
  }, [])

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
                    
                    <h1 className={styles.text}>Welcome To Dashboard</h1>
                    <h1 className={styles.mess}>Health And Diet Chart Plan</h1>
                  </div>

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
