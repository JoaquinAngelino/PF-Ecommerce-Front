import {React, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { Link } from "react-router-dom";


export default function Detail(){
    const dispatch= useDispatch()
    const cellId= useSelector((state)=>state.details)
    //useEffect(()=>{
        //dispatch(getCellsById(id))
        //},[dispatch,id])
    return(
    <div>
     <h1>Cell</h1>   
    <h3>{cellId.line}</h3>
    <h4 >{cellId.model}</h4>
    <h4 >{cellId.capacity}</h4>
    <h5 >{cellId.price}</h5>
    <h5 >{cellId.stock}</h5>
    <h5 >{cellId.image}</h5>
    <h5>{cellId.spec}</h5>
    <h5>{cellId.memoryRAM}</h5>
    <h5>{cellId.description}</h5> 

    </div>
    
    )
  

}