
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Logout/LogoutButton';


const Profile=()=>{
    const {user, isAuthenticated}=useAuth0()

    return (
     
      isAuthenticated &&(
          <div className="container">
            <div className="row">
              <div className="col-12 my-3 pt-3 shadow">
                {/* {JSON.stringify(user)} */}
                <img  className="ProfileImg" src={user.picture} />
                <h4>{user.name}</h4>
                <h5>{user.email}</h5>
                {/* "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHVLf9CA9-Aga5SAXLHh0evd-Zrsn3l0Wlg&usqp=CAU" */}

              </div>

            </div>
            {/* <img className="ProfileImg" src={user.picture}/>
            <h5>Name:</h5>
            <h2>{user.name}</h2>
            <h5>email:</h5>
            <p>{user.email}</p> */}
          <LogoutButton/>
          </div>

       
      )     
    )

 }
 export default Profile;