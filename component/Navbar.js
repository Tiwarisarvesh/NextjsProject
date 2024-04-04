import React , {useState , useEffect} from "react";
import Image from "next/image";
import articleStyle from "../styles/Navbar.module.css";
import Link from "next/link";
import Logo from "../public/Logo_header.png";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useRouter } from 'next/router';

function index() {
 
  const [UserToken, SetUserToken] = useState();

  const router = useRouter()

 const getuserToken = () => {
  // Usertoken
  const UserToken = localStorage.getItem("Usertoken");
  SetUserToken(UserToken);
 }
  
 const userLogout = () => {
  const UserToken123 = localStorage.removeItem("Usertoken");
  console.log("userjdhfsjdhj",UserToken123)
  if(UserToken123 === undefined){
     alert("Are You Logout ??")
     window.location.reload();
    // router.push("/");
  }
 }

 useEffect(() => {
  getuserToken();
  // userLogout();
}, []);
 

  return (
    <div>
      

      <Navbar collapseOnSelect expand="lg" bg="light" variant="light"  className={articleStyle.Container}>
        
        <Container>
          
          <Link href="/">
            <a>
              <Image
                src={Logo}
                width={150}
                height={90}
                alt="Picture of the author"
              />
            </a>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3 " >
              
            <Link href="/"><a className={articleStyle.nav_item}>Home</a></Link>
            <Link href="/about"><a className={articleStyle.nav_item}>About Us</a></Link>
            <Link href="/excerciseList"><a className={articleStyle.nav_item}>ExcerciseList</a></Link>
            <Link href="/exercisePost"><a className={articleStyle.nav_item}>Exercise Post</a></Link>
            <Link href="/foodPost"><a className={articleStyle.nav_item}>Food Post</a></Link>
            <Link href="/contact"><a className={articleStyle.nav_item}>Contact Us</a></Link>
            {/* <Link href="/login"><a className={articleStyle.nav_item_login}>Login / Registration</a></Link> */}
            {/* {console.log("UserToken-navbar",UserToken)} */}
            {!UserToken ? <Link href="/login"><a className={articleStyle.nav_item_login}>Login / Registration</a></Link> :<button onClick={userLogout} className={articleStyle.nav_item_login}>Logout</button>}
            {/* <Link href="/"><a className={articleStyle.nav_item}>Home</a></Link> 
            <Link href="/"><a className={articleStyle.nav_iem}>Home</a></Link>
            <Link href="/"><a className={articleStyle.nav_item}>Home</a></Link> */}
           
           
            

              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3"> Something </NavDropdown.Item>
                <NavDropdown.Divider />
                
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}

            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default index;
