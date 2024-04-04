import React from 'react'
import Image from 'next/image'
import contactUs from '../public/login/contactUs.jpg';
import styles from '../styles/login.module.css'

function login() {
  return (
    <>
     <Image
      src={contactUs}
      width={10000}
      height={2000}
      alt="First Slide"
      className='d-block w-100'
    />
     <h1 className='text-center mt-5'> Login</h1>
    <div className={styles.container}>
      <form>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary mt-3">Submit</button>
</form>
    </div></>
  )
}

export default login
