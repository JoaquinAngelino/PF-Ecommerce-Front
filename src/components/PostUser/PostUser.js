import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allUser, postUser } from '../../redux/actions';
import { useAuth0 } from "@auth0/auth0-react";
import{useNavigate}from "react-router-dom"
import NotFound from '../../pages/NotFound/NotFound';

export default function CreateUser(){
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const {user, isAuthenticated}=useAuth0()
    console.log("Eston es: "+isAuthenticated)
    console.log(user)
    const image=user.picture||"https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"
    console.log(image)
    
    const [input, setInput] = useState({
        name:user?user.name:"",
        email:user?user.email:"",
        password:"",
        image:user?image:"https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
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
    isAuthenticated ?(
        <div>
            <div>
            <img src={input.image}/>
              <h4>{input.name}</h4>
             <h4>{input.email}</h4>
            </div>

<div>
<label>Location </label>
        <input type="text"
        value={input.location}
        name="location"
        id="location"
        onChange={handleChange}/>
</div>
<div>
    <br></br>
<label>Direction</label>
        <input type="text"
        value={input.direction}
        name="direction"
        id="direction"
        onChange={handleChange}/>
</div>
<br></br>
<div>
<button onClick={handleSubmit}>Update</button>
</div>

      
    </div>
    ):<NotFound/>

)
}