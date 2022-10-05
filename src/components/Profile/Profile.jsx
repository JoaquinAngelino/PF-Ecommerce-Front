
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Logout/LogoutButton';
import { Link } from 'react-router-dom';
import { useEffect } from "react"; 
import {useDispatch, useSelector} from "react-redux"
import { allUser, postUser, putUser } from "../../redux/actions";
import { useState } from "react";
import{useNavigate}from "react-router-dom"



const Profile=()=>{
  const dispatch=useDispatch();
  const {user, isAuthenticated}=useAuth0()
  const navigate=useNavigate()
 
  const allUsers=useSelector(state=>state.allUser)
  const usuarios=allUsers
  const emailAuth0=email()
  const profile=filterEmail()
  console.log(usuarios)
  console.log(emailAuth0)
  console.log(profile)
  
  const [input,setInput]=useState({
    id:profile!==undefined && profile[0]?profile[0].id:"",
    name:profile!==undefined && profile[0]?profile[0].name:"",
    email:profile!==undefined && profile[0]?profile[0].email:"",
    location:profile!==undefined && profile[0]?profile[0].location:"",
    direction:profile!==undefined && profile[0]?profile[0].direction:""
  })

  const [input1,setInput1]=useState({
    name:user?user.name:"",
    email:user?user.email:"",
    image:user?user.picture:"",
    location:"",
    direction:"",
    rol:"",
    password:"",
  })
  

function filterEmail() {
  if (isAuthenticated && usuarios.length) {
    return usuarios.filter(e => e.email === emailAuth0)
  }
}
  function email() {
    if (isAuthenticated) {
      return user.email
    }
  }
 
  function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
    console.log(input)
}
function handleChange1(e){
  setInput1({
    ...input1,
    [e.target.name]:e.target.value
  })
  console.log(input1)
}

useEffect(()=>{
dispatch(allUser())
},[dispatch])

// function handleSubmit(){
//   dispatch(putUser(input))
//   .then(()=>{
//     dispatch(allUser())
//   })
// }
// function handleSubmit1(e){
//   dispatch(postUser(input1))
//   .then(()=>{
//     dispatch(allUser())
//   })
//   .then(()=>{
//     navigate("/home")
//   })
// }
function handleChange2(){
  if(profile!==undefined && profile[0] && profile[0].id){
    dispatch(putUser(input))
    .then(()=>{
      dispatch(allUser())
    })
    .then(()=>{
      navigate('/Home')
    })
  }
  if(profile===undefined || !profile[0]){
    dispatch(postUser(input1))
    .then(()=>{
      dispatch(allUser())
    })
    .then(()=>{
      navigate('/Home')
    })
  
  }
}



    return (
      
     
      isAuthenticated && profile!==undefined && profile[0]? (
          <div className="container">
            <div className="row">
              <div className="col-12 my-3 pt-3 shadow">
                {/* {JSON.stringify(user)} */}
                <img  className="ProfileImg" src={profile[0].image}  />
                <h4>{user.name}</h4>
                <h5>{user.email}</h5>
                <br></br>
                <div>
                <label>Location:</label>
                <input type='text'
                value={input.location}
                name='location'
                id='location'
                onChange={handleChange}></input>
                </div>
              
                <br></br>
                <div>
                <label>Direction:</label>
                <input type='text'
                value={input.direction}
                name='direction'
                id='direction'
                onChange={handleChange}></input>
                </div>
               <br></br>
                {/* <button onClick={handleSubmit}>Update</button> */}
                <div>
                <button onClick={handleChange2}>Update</button>
                </div>
                

                {/* "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHVLf9CA9-Aga5SAXLHh0evd-Zrsn3l0Wlg&usqp=CAU" */}
                
             

              </div>

            </div>
</div>

       
      )     : isAuthenticated && profile[0]===undefined?(
        <div className="container">
            <div className="row">
              <div className="col-12 my-3 pt-3 shadow">
                {/* {JSON.stringify(user)} */}
                <img  className="ProfileImg" src={user.picture} alt='Profile Image' />
                <h4>{user.name}</h4>
                <h5>{user.email}</h5>
                <div>
                   <label>Location:</label>
                <input type='text'
                value={input1.location}
                name='location'
                id='location'
                onChange={handleChange1}></input>

                </div>
               <div>
               <label>Direction:</label>
                <input type='text'
                value={input1.direction}
                name='direction'
                id='direction'
                onChange={handleChange1}></input>
               </div>
             
                {/* <button onClick={handleSubmit1}>Update</button> */}
                <button onClick={handleChange2}>Update</button>

                </div>
                </div>
                </div>

      ):null
    )

    
 }
 
 export default Profile;