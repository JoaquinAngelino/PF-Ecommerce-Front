import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser, putUser, userId } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function EditUser(props){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user, isAuthenticated}=useAuth0()
    let id=props.match.params.id;

    const [profile, setProfile]=useState({
        name:"",
        email:"",
        password:"",
        image:"",
        location:"",
        direction:"",
        rol:""
    })
    function handleChange(e){
        setProfile({
            ...profile,
            [e.target.name]:e.target.value
        })
        function handleSubmit(e){
            e.preventDefault()
            dispatch(putUser(profile))
            .then(()=>{
                dispatch(allUser())
            })
            .then(()=>{
                navigate('/home')
            })
        }
    }
useEffect(()=>{
    dispatch(userId(id))
   
},[dispatch, id])

const userProfile=useSelector((state)=>state.user);
return (
    userProfile
    ?(
        <div>
            <div>
                <img src={userProfile[0].image}></img>
            </div>
            <div>
                <label>{userProfile[0].name}</label>
            </div>
            <div>
                <label>{userProfile[0].email}</label>
            </div>
            <div>
                <label>Location</label>
                <input type='text'
                value={profile.location}
                name="location"
                id='location'
                onChange={handleChange}/>
            </div>
            <div>
                <label>Direction</label>
                <input type='text'
                value={profile.direction}
                name='direction'
                id='direction'
                onChange={handleChange}/>
            </div>
            <div>
                {/* <button onClick={handleSubmit}>Update</button> */}
            </div>
        </div>
    )
    :null
)









}