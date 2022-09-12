
import { NavDropdown } from 'react-bootstrap';
import { BsCartFill, BsStarFill, BsFillPhoneFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function NavBar() {

  return (
    <nav>
      <div>
        <div>
        </div>

        <div>
          <Link to='/home'><BsFillPhoneFill className='CardIcon' /></Link>
          <Link to='/favorites'><BsStarFill className='CardIcon' /></Link>
          <Link to='/cart'><BsCartFill className='CardIcon' /></Link>
          <Link to='/create'><strong>Sell</strong></Link>
        </div>

        {/* <SearchBar /> */}
        {/* <img className="ProfileImg" src={user.picture} alt="user" referrerPolicy="no-referrer" /> */}
        {/* <NavDropdown title={user.nickname} id="navbarScrollingDropdown">
          <NavDropdown.Item href='/profile/data' className="dropDown" >Personal Data</NavDropdown.Item>
          {/* <NavDropdown.Item href='/profile/shop-history' className="dropDown" >Shopping history</NavDropdown.Item> */}
          {/* <NavDropdown.Item href='/profile/my-products' className="dropDown" >My Products</NavDropdown.Item>
          {userDetail.isAdmin && <NavDropdown.Item href='/profile/admin' className="dropDown" >Admin panel</NavDropdown.Item>} */}
        {/* </NavDropdown> */}
        {/* <LogOutBtn /> */}
        {/* <LogInBtn /> */}
        {/* <LightDarktn /> */}
      </div>
    </nav>
  )
}