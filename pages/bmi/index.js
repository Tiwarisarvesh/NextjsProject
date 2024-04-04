import React, { useState ,useEffect} from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import styles from "../bmi/bmi.module.css";
import Link from 'next/link';


function index() {
  const [heightValue, setHeightValue] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [bmiValue, setBmiValue] = useState("");
  const [bmiMessage, setBmiMessage] = useState("");
  const [bmiMessagelink, setBmiMessagelink] = useState("");

  const [UserToken, SetUserToken] = useState();

  const getuserToken = () => {
    // Usertoken
    const UserToken = localStorage.getItem("Usertoken");
    SetUserToken(UserToken);
   }

  const calculateBmi = () => {
    if (heightValue && weightValue) {
      const heightInMeters = heightValue / 100;
      const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
      setBmiValue(bmi);

      let message = "";
      let messagelink = "";
      if (bmi < 18.5) {
        message = "You are Under Weight";
        messagelink = "Underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        message = "You are Healthy";
        messagelink = "Normal weight";
      } else if (bmi >= 25 && bmi < 30) {
        message = "You are Over Weight ";
        messagelink = "Overweight";
      } else {
        message = "You are Too Hight";
        messagelink = "Too Height";
      }
      setBmiMessage(message);
      setBmiMessagelink(messagelink);
    } else {
      setBmiValue("");
      setBmiMessage("");
      setBmiMessagelink("");
    }
  };

  useEffect(() => {
    getuserToken();
    }, []);

  return (
    <div>
      <Navbar />

      {!UserToken ?<> <span className={styles.notlogin}>Sorry You are not Logged in. Please log in and try again</span> <Link href="/login"><a>Click Here Login</a></Link> </> : 
      <div className={styles.container}>
        <h1 className={styles.heading}>BMI Calculator</h1>
        {/* Content Here */}
        <div class="row">
          {console.log("messagelink",bmiMessagelink)}
          <div className="col-sm">
          <div class="mb-4">
            <label for="exampleFormControlInput1" class="form-label">Enter Your Height (cm):</label>
            <input
                type="number"
                id="height"
                class="form-control"
                value={heightValue}
                onChange={(e) => setHeightValue(e.target.value)}
              />
          </div>
          <div class="mb-4">
            <label for="exampleFormControlTextarea1" class="form-label">Enter Your Weight (kg):</label>
            <input
                type="number"
                id="weight"
                class="form-control"
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
              />
          </div>

          <button className="btn btn-primary btn-lg btn-block mb-3" onClick={calculateBmi}>
              Click to Calculate BMI
            </button>
            {bmiValue && bmiMessage && (
              <div className="result">
                <p>
                  Your BMI: <span className="bmi-value">{bmiValue}</span>
                </p>
                <p>
                  Result: <span className="bmi-message">{bmiMessage}</span>
                </p>
               <Link href='/bmiexercise'><a> <button className="btn btn-primary btn-lg btn-block m-3" onClick={calculateBmi}> GET Exerices </button></a></Link>
                <Link href='/bminutrition'><a><button className="btn btn-primary btn-lg btn-block m-3" onClick={calculateBmi}> GET NUTRITION </button></a></Link>
              </div>
            )}
          

          </div>
          <div class="col-sm">
          
          <table class="table table-success table-striped">
              <thead>
                <tr>
                  <th>Weight status</th>
                  <th>Body Mass Index</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Over underweight</td>
                  <td>Below 16</td>
                </tr>
                <tr>
                  <td>underweight</td>
                  <td>16.0 to 18.5</td>
                </tr>
                <tr>
                  <td>healthy</td>
                  <td>18.5 to 25</td>
                </tr>
                <tr>
                  <td>Over Weight</td>
                  <td>25 To 30</td>
                </tr>
                <tr>
                  <td>Too Hight</td>
                  <td>30 To Above</td>
                </tr>
              </tbody>
              </table>
          
          </div>
          
        </div>

        {/* Content Here */}
      </div>}

      <Footer />
    </div>
  );
}

export default index;
