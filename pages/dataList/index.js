import React, { useEffect, useState } from "react";
import styles from "../dataList/datalist.module.css";
// import InfiniteScroll from "react-infinite-scroll-component";

function index() {
  const LIMIT = 9;

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUserData = async () => {
    await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers((prev) => [...prev, ...data]);
      });
  };

  const handleinfiniteScroll = async () => {
    // console.log("window.innerHeight", window.innerHeight);
    // console.log( "document.documentElement.scrollTop", document.documentElement.scrollTop );
    // console.log("document.documentElement.scrollHeight", document.documentElement.scrollHeight );
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleinfiniteScroll);
    return () => window.removeEventListener("scroll", handleinfiniteScroll);
  });

  return (
    <div className="container">
      <div className="row">
        {users &&
          users.length > 0 &&
          users.map((userObj, index) => (
            <div className="col-sm-4 mb-3 mb-sm-0">
              <div className={styles.card} key={userObj.id}>
                <div className={styles.cardBody}>
                  <h5 className="card-title">
                    {userObj.id} ) {userObj.title.substring(0, 35)}
                  </h5>
                  <p className="card-text">{userObj.body.substring(0, 40)}</p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default index;
