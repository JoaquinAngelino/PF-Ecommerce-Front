import React from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Footer.css';
import { Link } from "react-router-dom";


export default function Footer() {
  const navigate = useNavigate();

//   function handleAbout(){
//     navigate("/about")
//     window.scrollTo({ behavior: "smooth", top: "0px" })
// }
  return (
//     <footer className="footer">
//        <div className="flexDiv"></div>
//        <span className="spanFooterStyle">
//          <span>
//          <h3>Created by:</h3>
//         <ul className="ul_members">
//          <li>
//           <a className="linkTo" href="  https://www.linkedin.com/in/andres-sanchez-de-la-fuente/" target="_blank" rel="noreferrer" >Andres Sanchez de La Fuente</a>
//            </li>

//          <li>
//           <a className="linkTo" href="https://www.linkedin.com/in/frank-smith-bocangelino-rojas-351157168/" target="_blank" rel="noreferrer" >Frank Smith</a>
//             </li>

//              <li>
//               <a className="linkTo" href="https://www.linkedin.com/in/joaquin-angelino-corona/" target="_blank" rel="noreferrer" >Joaquin Corona</a>
//                </li>

//                <li>
//               <a className="linkTo" href="https://www.linkedin.com/in/ayrton-nahir-arroyo-acevedo-b795b0212" target="_blank" rel="noreferrer" >Ayrton Acevedo</a>
//                </li>

//               <li>
//               <a className="linkTo" href="https://www.linkedin.com/in/fede-valdez-205499211/" target="_blank" rel="noreferrer" >Federico Valdez</a>
//                </li> 
//                    <li>
//                    <a className="linkTo" href="https://www.linkedin.com/in/juan-david-pabon-porras-4123b389/" target="_blank" rel="noreferrer" >Juan David Pabon</a>
//                    </li>
//                    </ul>
//                    <hr></hr>
//                     </span>
                    
//                     </span>
//                     </footer>
       
//   );
// }

 <Navbar className="footer" bg="dark" variant="dark">
        <Navbar.Text className='Light-Font'>© CellPhones E-Commerce, 2022. All rights reserved.</Navbar.Text>
      <Navbar.Text >
        <Link to='/about'><div>About Us</div></Link>
      </Navbar.Text >
      <Navbar.Text>
        <Link to='/contact'><div>Contact us</div></Link>
      </Navbar.Text>
      <Navbar.Text>

      </Navbar.Text>
    </Navbar>
  )
}