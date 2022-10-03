import React from "react";
import { Link } from 'react-router-dom';

const AdminPanel=()=>{

    return(
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
    )
}
export default AdminPanel;