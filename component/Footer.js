import React from "react";
import Image from "next/image";
import FooterLogo from "../public/Logo_header.png";
import styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Image
              src={FooterLogo}
              width={300}
              height={200}
              alt="Picture of the author"
            />
          </div>
          <div className="col-md-3">
            <h5>Details</h5>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Usefull Link</h5>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Testomenial</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact us</h5>
            <ul>
              <li>Address : Apt. 556 , Kulas Light</li>
              <li>Pin-Code : 210.067.6132</li>
              <li>Contact : 210.067.6132</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
