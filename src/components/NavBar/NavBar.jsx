//import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { NavDropdown } from 'react-bootstrap';
import { BsCartFill, BsStarFill, BsFillPhoneFill } from 'react-icons/bs';
import { AiOutlineUpload } from 'react-icons/ai';
import {AiOutlineUserAdd} from "react-icons/ai"
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css'
//LOGIN
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "../Login/LoginButton";
import LogoutButton from '../Logout/LogoutButton';
//LOGIN

export default function NavBar() {
  //login
const{isAuthenticated}=useAuth0()
  //login
  //const navigate = useNavigate();
  //const [name, setName] = useState('')

  //function handleInputChange(e) {
    //e.preventDefault();
    //setName(e.target.value);
  //}

  //function handleSubmit(e) {
   // e.preventDefault();
    //if (name) {
     // navigate(`/home?name=${name}`)
    //}
  //}

  return (
    <nav className='NavBar mb-2 p-2 bg-dark'>
      <div className="containerNavBar container-fluid justify-content-around ">
        <div className='BtnContainer'>
          <div className="navbar-nav hstack gap-3 NavBar-Item">
            <Link to='/home' className="nav-link"><BsFillPhoneFill className='NavBarIcon' /></Link>
            <Link to='/favorites' className="nav-link"><BsStarFill className='NavBarIcon' /></Link>
            <Link to='/cart' className="nav-link"><BsCartFill className='NavBarIcon' /></Link>
            <Link to='/create' className="nav-link"><AiOutlineUpload className='NavBarIcon' /></Link>
          
        
            {/* LOGIN */}
            {isAuthenticated ?    <Link to='Profile' className='nav-link'><AiOutlineUserAdd className='NavBarIcon' /></Link> : null}
            {
              isAuthenticated 
              ? <LogoutButton/> 
              : <LoginButton/>
            }
           
          
            {/* LOGIN */}
          </div>
        </div>

        <SearchBar/>
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