
import './Card.css'
// React utilities
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Styles
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { remove } from '../../components/Toast/Toast';

export default function DbShopCard({ id, model, stock, price, image, deleteItem, updateQuantity, quantity }) {
  const [qua, setQua] = useState(quantity);

  const plus = () => {
    if (qua < stock) {
      setQua(qua + 1)
      updateQuantity(id, quantity + 1)
    }
  }
  const minus = () => {
    if (qua > 1) {
      setQua(qua - 1)
      updateQuantity(id, quantity - 1)
    }
  }

  const delet = (id) => {
    remove();
    deleteItem(id);
  }

  return (
    <div className="cardShoppingCart">
      <Link className='cardContainerImageSC' to={"/detail/" + id}>
        <img className='cardImageSC' src={image} alt={model} />
      </Link>
      <div className='containerBodySC'>
        <h5>{model}</h5>
        <p><span className='priceSC'>${(price).toFixed(2)}</span></p>
        <p><span className='priceSC'>${(qua * price).toFixed(2)}</span> ({qua} Items)</p>
      </div>
      <div className='containerButtonsSC'>
        <div className='selectQuantity'>
          <AddCircleIcon onClick={plus} />
          <p>{qua}</p>
          <RemoveCircleIcon onClick={minus} />
        </div>
        <DeleteIcon onClick={() => delet(id)} />
      </div>
    </div>
  )
}
