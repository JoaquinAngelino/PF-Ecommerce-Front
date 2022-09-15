import React from "react";
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

export default function LandingPage(){
    const dispatch = useDispatch()
    return(
        <div>
        <h1 id="h1l">Welcome to Cells Store</h1>
        <Link id="al" to= '/home'>
            <button>Ingresar</button>
        </Link>
        </div>
    )

}
