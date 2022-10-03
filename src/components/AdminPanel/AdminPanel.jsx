import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NotFound from '../../pages/NotFound/NotFound';
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "../../redux/actions";


const AdminPanel=()=>{
    const { user, isAuthenticated, logout } = useAuth0()
    const dispatch = useDispatch;
    const admin = useSelector((state) => state.admin)

    useEffect(() => {
        if (isAuthenticated) {
           dispatch(getRole(user.email));
 
        }
  
     }, [dispatch])

    return(
        <div>
            {isAuthenticated && admin ?
            <div>
                <div>
                    <h4>Usuarios</h4>
                    <Link to='/panelUsers'><button>User</button></Link>
                </div>
                <div>
                    <h4>Cells</h4>
                    <Link to='/panelCells'><button>Celss</button></Link>
                </div>
                <div>
                    <h4>Orders</h4>
                    <Link to='/panelorders'><button>Orders</button></Link>
                </div>
            </div>

           :
           <div>
                <p>it is not allowed</p>
                <NotFound/>
           </div>}
        </div>
    )
}
export default AdminPanel;