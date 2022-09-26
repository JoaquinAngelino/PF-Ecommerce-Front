import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allUser, postUser } from '../../redux/actions';
import { useAuth0 } from "@auth0/auth0-react";
import{useNavigate}from "react-router-dom"

export default function CreateUser(){
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const {user, isAuthenticated}=useAuth0()
    console.log(isAuthenticated)
    
    const [input, setInput] = useState({
        name:user.name,
        email:user.email,
        password:"",
        image:user.picture,
        location:"",
        direction:"",
        rol:""
      })
function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
    console.log(input)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(postUser(input))
    .then(()=>{
        dispatch(allUser())
    })
    .then(()=>{
        navigate("/home")
    })
}

return(
    isAuthenticated &&(
        <div>
        <img src={input.image}/>
        <h4>{input.name}</h4>
        <h4>{input.email}</h4>
        <label>location</label>
        <input type="text"
        value={input.location}
        name="location"
        id="location"
        onChange={handleChange}/>
         <label>direction</label>
        <input type="text"
        value={input.direction}
        name="direction"
        id="direction"
        onChange={handleChange}/>
        <button onClick={handleSubmit}>Update</button>
    </div>
    )

)
}