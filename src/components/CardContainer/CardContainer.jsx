import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCelulares } from '../../redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CardContainer/CardContainer.css';

const CardContainer = () => {
  const dispatch = useDispatch();
  const allCards = useSelector((state) => state.allCell);

  useEffect(() => {
    dispatch(getCelulares())
  })

  return (
    <div>
      <div >
        {allCards?.map((e, index) => {
          return (
            <div key={index} className='card'>
              <div>
                <img className="card-img-top col-6" src="#" alt="Card image cap">{e.image}</img>
              </div>
              <div className="card-body-columns m-4">
                <h3 className="card-title">{e.line}</h3>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CardContainer