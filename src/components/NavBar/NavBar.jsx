import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { BsCartFill, BsStarFill, BsFillPhoneFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css'

export default function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState('')

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      navigate(`/home?name=${name}`)
    }
  }

  return (
    <nav className='NavBar mb-2 p-2 bg-dark'>
      <div className="containerNavBar container-fluid justify-content-around ">
        <div className='BtnContainer'>
          <div className="navbar-nav hstack gap-3 NavBar-Item">
            <Link to='/home' className="nav-link"><BsFillPhoneFill className='CardIcon' /></Link>
            <Link to='/favorites' className="nav-link"><BsStarFill className='CardIcon' /></Link>
            <Link to='/cart' className="nav-link"><BsCartFill className='CardIcon' /></Link>
            <Link to='/create' className="nav-link"><strong>Sell</strong></Link>
          </div>
        </div>
        <div className='BtnContainer'>
          <div className="navbar-nav hstack gap-3 NavBar-Item">
            <div className='containerSearchBar d-flex'>
              <form className="d-flex input-group" role="search" onSubmit={(e) => { handleSubmit(e) }}>
                <input className="form-control me-2" value={name} name={"name"} onChange={(e) => { handleInputChange(e) }} placeholder='Type your search...' />
              </form>
            </div>
          </div>
        </div>
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