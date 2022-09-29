import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { allUser } from "../../redux/actions";
//import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { NavDropdown } from 'react-bootstrap';
import { BsCartFill, BsStarFill, BsFillPhoneFill } from 'react-icons/bs';
import { AiOutlineUpload } from 'react-icons/ai';
import { AiOutlineUserAdd } from "react-icons/ai"
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

  const dispatch = useDispatch()
  const allUsers = useSelector(state => state.allUser);
  const { user, isAuthenticated } = useAuth0()
  const usuarios = allUsers
  const emailAuth0 = email()
  const gmail = filterEmail()

  const userRole = role()

  localStorage.setItem('user', JSON.stringify(emailAuth0))

  useEffect(() => {
    dispatch(allUser());

    // dispatch(email());
    // dispatch(filterEmail());
  }, [dispatch])

  // const filterEmail=usuarios.filter(e=>e.email==="nahirarroyo@gmail.com")
  function filterEmail() {
    if (isAuthenticated && usuarios.length) {
      return usuarios.filter(e => e.email === emailAuth0)
    }
  }

  function role() {
    if (!gmail === undefined) {
      return gmail[0].role
    }
  }

  function email() {
    if (isAuthenticated) {
      return user.email
    }
  }
  // function role(){
  //   if(gmail.length){
  //     return gmail.role
  //   }
  // }
  // function role(){
  //   gmail.then(()=>{
  //     return gmail[0].role
  //   })
  // }

  //login
  // const myUser=useSelector((state)=>state.user)

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
    <nav className='NavBar mb-2 p-2 sticky-top bg-dark'>
      <div className="containerNavBar container-fluid justify-content-around ">
        <div className="navbar-nav hstack gap-3 NavBar-Item">
          <Link to='/home' className="nav-link"><BsFillPhoneFill className='NavBarIcon' /></Link>
          <Link to='/favorites' className="nav-link"><BsStarFill className='NavBarIcon' /></Link>
          <Link to='/cart' className="nav-link"><BsCartFill className='NavBarIcon' /></Link>
          {
            isAuthenticated && gmail !== undefined && gmail[0] && gmail[0].role !== "Cliente"
              ? <Link to='/create' className="nav-link"><AiOutlineUpload className='NavBarIcon' /></Link>
              : null
          }
          {isAuthenticated ? <Link to={'Profile/'} className='nav-link'><AiOutlineUserAdd className='NavBarIcon' /></Link> : null}
          {
            isAuthenticated && gmail !== undefined
              // && !gmail===undefined && gmail.length!==1
              //  gmail===undefined && !gmail[0] 
              ? (gmail.length === 0 ?
                <Link to='/postUser'>
                  <button>Complete sus datos de usuario</button>
                </Link>
                : null
              )
              : null

            }

{
              isAuthenticated && gmail===undefined 
              // && !gmail===undefined && gmail.length!==1
              //  gmail===undefined && !gmail[0] 
              ?(
                    
                    <Link to='/postUser'>
                         <button>Complete sus datos de usuario</button>
                    </Link>
                    
              ) 
              
              : null
            }


            {
              isAuthenticated?<LogoutButton/> :<LoginButton/>
            }
            
              {
                isAuthenticated && gmail!==undefined && gmail[0] && gmail[0].role==="Administrador"
               ? <Link className="nav-link text-light fw-semibold `${}`" to="/adminPanel">Admin Panel</Link> 
               : null
              }
            
               
            
           
          
           
          </div>
        </div>

        <SearchBar/>
        
        
     
    </nav>
  )
}