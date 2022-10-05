import React from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Footer.css';
import { Link } from "react-router-dom";


export default function Footer() {
  const navigate = useNavigate();
  return (
  
    <Navbar className="footer" bg="dark" variant="dark">
      <Navbar.Text className='Light-Font'>© CellPhones E-Commerce, 2022. All rights reserved.</Navbar.Text>
      <Navbar.Text >
        <Link to='/about'>
          <button className="btn btn-danger text-decoration-none">About us</button>
        </Link>
      </Navbar.Text >
      <Navbar.Text>
        <Link to='/contact'>
          <button className="btn btn-danger text-decoration-none">Contact us</button>
        </Link>
      </Navbar.Text>
      <Navbar.Text>
      </Navbar.Text>
    </Navbar>
  )
}

//<Link to='/about'><div>About Us</div></Link>
//<Link to='/contact'><div>Contact us</div></Link>