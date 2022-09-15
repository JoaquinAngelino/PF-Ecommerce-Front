import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CardContainer/CardContainer.css';

const CardContainer = () => {
  return (
      <div className="card">
        <img className="card-img-top col-6" src="#" alt="Card image cap"></img>
        <div className="card-body-columns m-4">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
  )
}

export default CardContainer