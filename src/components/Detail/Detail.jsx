import "./CellDetail.css"
import React from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { cellDetail, cleanStatus } from "../../redux/actions";
import { useEffect } from "react";
import Questions from "../Questions/Questions.jsx";
import { addToFav, addToCart } from '../Card/favAndCart';
import { BsCartFill, BsStarFill } from 'react-icons/bs';



export default function Detail(props) {

    const dispatch = useDispatch();
    // let id=props.match.params.id;
    const { id } = useParams()
    const myCell = useSelector((state) => state.details)

    function handleClearStatus(e) {
        dispatch(cleanStatus())
    }

    useEffect(() => {
        dispatch(cleanStatus());
        dispatch(cellDetail(id))
    }, [dispatch, id])

    const get = () => {
        dispatch(cellDetail(id))

    return (
        <div className="container">
            {
                myCell ?
                    <div>
                        <div className="row detailsContainer d-flex flex-column align-items-center">
                            <div className="card row detailsContainer d-flex flex-column align-items-center">
                                <div className="d-flex flex-row justify-content-between">
                                    <Link to='/home' className="align-self-start">
                                        <button className="btn btn-primary bg3 border-0 m-3" style={{ width: '2.3rem' }} onClick={(e) => handleClearStatus(e)}>X</button>
                                    </Link>
                                    <BsStarFill className='CardIcon' onClick={() => addToFav(myCell.id, myCell.brand, myCell.line, myCell.model, myCell.price, myCell.stock, myCell.capacity, myCell.image, myCell.memoryRAM)} />
                                </div>
                                <div className=" col-12 d-flex flex-sm-column flex-md-row align-items-center justify-content-center">
                                    <div className="d-flex flex-column" style={{ width: '65%' }}>
                                        {myCell.stock === 0 ? <h3 style={{ color: 'red' }}>Out of stock</h3> : null}
                                        <div>
                                            <img src={myCell.image} className="img w-75" alt="img" />
                                        </div>
                                        <div className='d-flex flex-column m-5 align-items-start'>
                                            <h3 className="tx4">Description</h3>
                                            <p className='description'>{myCell.description}</p>
                                            <h3 className="tx4">Specs</h3>
                                            <div className="specs">
                                                {myCell.spec && myCell.spec.map((e) => { return <li>{e}</li> })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container-title">
                                    <div className="container-6 p-3 d-flex flex-column align-items-start justify-content-around border-start border-dark border-opacity-10">
                                        {/* <div className="d-flex flex-column align-items-start justify-content-around border-start border-dark border-opacity-10 ps-4" style={{ width: '35%' }}> */}
                                        <div className="d-flex flex-column align-items-start justify-content-around" >

                                            <h1 className="d-flex flex-column align-items-start tx4">{`${myCell.brand} ${myCell.model} ${myCell.capacity}`}</h1>
                                            <h6>Brand: {myCell.brand}</h6>
                                            <h6>Model: {myCell.model}</h6>
                                            <h6>Capacity: {myCell.capacity}GB</h6>
                                            <h6>Memory RAM: {myCell.memoryRAM}GB</h6>
                                            <h3 >Price: ${myCell.price}</h3>
                                        </div>
                                        <div className="d-flex flex-column w-100">
                                            <p className={`align-self-center ${myCell.stock < 5 ? 'text-danger fw-bold' : null}`}>{`Stock available: (${myCell.stock} available)`}</p>
                                        </div>
                                        <button type="submit" className="btn btn-primary button3 bg3 border-0"  onClick={() => addToCart(myCell.id, myCell.brand, myCell.line, myCell.model, myCell.price, myCell.stock, myCell.capacity, myCell.image, myCell.memoryRAM)}>Add to cart</button>
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <Questions key={myCell.id} cellId={myCell.id} q={myCell.questions} get={get}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    : <p>Loanding...</p>
            }

        </div>
    )
}