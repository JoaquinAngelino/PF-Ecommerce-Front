import {React, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { Link } from "react-router-dom";

export default function Detail(){
    const dispatch= useDispatch()
    return(
    <div>
     <h1>Cell</h1>   
    {/* <h3>{Cell.line}</h3>
    <h4 >{Cell.model}</h4>
    <h4 >{Cell.capacity}</h4>
    <h5 >{Cell.price}</h5>
    <h5 >{Cell.stock}</h5>
    <h5 >{Cell.image}</h5>
    <h5>{Cell.spec}</h5>
    <h5>{Cell.memoryRAM}</h5>
    <h5>{Cell.description}</h5> */}

    </div>
    
    )
  

}