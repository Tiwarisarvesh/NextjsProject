import "../styles/globals.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import "../component/Pagination.scss"

function MyApp({ Component, pageProps }) {
  
  return (
      <>
        {/* <Navbar /> */}
        <Component {...pageProps} />
        <ToastContainer />
        {/* <Footer /> */}
      </>
  );
}

export default MyApp;