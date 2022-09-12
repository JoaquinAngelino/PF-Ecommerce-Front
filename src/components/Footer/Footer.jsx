import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


export default function Footer() {

  return (
    <nav>
      <div className='NavBarItem' >
        <div>© CellPhones E-Commerce, 2022. All rights reserved.</div>
      </div >
      <div className='NavBarItem'>
        <Link to='/about'><div>About Us</div></Link>
      </div >
      <div className='NavBarItem'>
        <Link to='/contact'><div>Contact us</div></Link>
      </div>
    </nav>
  );
}