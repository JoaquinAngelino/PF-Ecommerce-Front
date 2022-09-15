import {React, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { Link } from "react-router-dom";

export default function Detail(){
    const dispatch= useDispatch()
    return(
    <div>
    <h1>{celular.name}</h1>
    <h3 >{celular.id}</h3>
    <h4 >Celular</h4>
    <h5 >Marca:{celular.marca}</h5>
    <h5 >Order:{celular.order}</h5>
    <h5 >User:{celular.user}</h5>

    </div>
    
    )
  

}