
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Logout/LogoutButton';
import { Link } from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux"


const Profile=()=>{
  const dispatch=useDispatch();
 





 
    const {user, isAuthenticated}=useAuth0()
    console.log(user)

    return (
     
      isAuthenticated && (
          <div className="container">
            <div className="row">
              <div className="col-12 my-3 pt-3 shadow">
                {/* {JSON.stringify(user)} */}
                <img  className="ProfileImg" src={user.picture} alt='profile_image' />
                <h4>{user.name}</h4>
                <h5>{user.email}</h5>
                {/* "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHVLf9CA9-Aga5SAXLHh0evd-Zrsn3l0Wlg&usqp=CAU" */}
                
             

              </div>

            </div>
</div>

       
      )     
    )

    
 }
 
 export default Profile;