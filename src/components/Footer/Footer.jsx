import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';


export default function Footer() {

  return (
    <Navbar className="footer" bg="dark" variant="dark">
        <Navbar.Text className='Light-Font'>© CellPhones E-Commerce, 2022. All rights reserved.</Navbar.Text>
      <Navbar.Text >
        <Link to='/about'><div>About Us</div></Link>
      </Navbar.Text >
      <Navbar.Text>
        <Link to='/contact'><div>Contact us</div></Link>
      </Navbar.Text>
    </Navbar>
  );
}