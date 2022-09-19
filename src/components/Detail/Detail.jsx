import "./CellDetail.css"
import React from "react";
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { cellDetail } from "../../redux/actions";
import { cleanStatus } from "../../redux/actions";
import { useEffect } from "react";

export default function Detail(props){

    const dispatch=useDispatch();
    // let id=props.match.params.id;
    const {id}=useParams()

    function handleClearStatus(e){
        dispatch(cleanStatus())
    }

    useEffect(()=>{
        dispatch(cellDetail(id))
    },[dispatch,id])

    const myCell=useSelector((state)=>state.details)
    
    return(
       
       <div className="container">
            
            {
                myCell?
                <div className="row detailsContainer d-flex flex-column align-items-center">
                <div className="card row detailsContainer d-flex flex-column align-items-center">
                    <div className="d-flex flex-row justify-content-between">
                        <Link to='/home' className="align-self-start">
                            <button className="btn btn-primary bg3 border-0 m-3" style={{width:'2.3rem'}} onClick={(e)=>handleClearStatus(e)}>X</button>
                        </Link>
                        </div>
                        <div className=" col-12 d-flex flex-sm-column flex-md-row align-items-center justify-content-center">
                        <div className="d-flex flex-column" style={{ width: '65%' }}>
                                {myCell.stock ===0 ? <h3 style={{color:'red'}}>Out of stock</h3>:null}
                                <div>
                                    <img src={myCell.image} className="img w-75" alt="img"/>
                                </div>
                                <div className='d-flex flex-column m-5 align-items-start'>
                                    <h3 className="tx4">Description</h3>
                                    <p className='description'>{myCell.description}</p>
                                    <h3 className="tx4">Specs</h3>
                                    <div className="specs">
                                        {myCell.spec && myCell.spec.map((e)=>{return <li>{e}</li>})}
                                    </div>
                                </div>
                            </div>
                            <div className="container-6 p-3 d-flex flex-column align-items-start justify-content-around border-start border-dark border-opacity-10">
                            {/* <div className="d-flex flex-column align-items-start justify-content-around border-start border-dark border-opacity-10 ps-4" style={{ width: '35%' }}> */}
                             <div className="d-flex flex-column align-items-start justify-content-around" >
                                
                            <h1 className="d-flex flex-column align-items-start tx4">{`${myCell.brand} ${myCell.model} ${myCell.capacity}`}</h1>
                            <h4>Brand:{myCell.brand}</h4>
                            <h4>Model:{myCell.model}</h4>
                            <h4>Price:{myCell.price}</h4>
                            </div>
                            <div className="d-flex flex-column w-100">
                                <p className={`align-self-center ${myCell.stock < 5 ? 'text-danger fw-bold' : null}`}>{`Stock available:(${myCell.stock} available)`}</p>
                                <div className="input-group">
                                    <button type="button" className="btn btn-outline-primary" value={'-'}>-</button>
                                    <input aria-label="Example text with two button addons" className="text-center form-control" value="value" />
                                    <button type="button" className="btn btn-outline-primary" value={'+'}>+</button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary button3 bg3 border-0">Add to cart</button>


                            </div>


                        </div>

                    </div>
 

                </div>:<p>cargando...</p>
            }

       

        </div>
    )
}