//import './Card.css'
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { addToCart } from '../../components/Card/favAndCart';
import { BsCartFill } from 'react-icons/bs';

export default function FavCard({ id, brand, line, model, price, stock, capacity, image, memoryRAM, deleteFav }) {

  return (
    <Card className="card" >
      <Link className='containCardImage' to={"/detail/" + id}>
        <img className='cardImage' src={image} alt={model} />
      </Link>
      <Card.Body className='containCardBody'>
        <Link to={"/detail/" + id}>
          <Card.Title className='containerName'>{model}</Card.Title>
        </Link>
        <ListGroup className='containerListDescription' variant="flush">
          <ListGroup.Item className='cardBrand'>Brand {brand}</ListGroup.Item>
          <ListGroup.Item className='cardBrand'>Stock {stock}</ListGroup.Item>
          <ListGroup.Item className='cardBrand'>Capacity {capacity}GB</ListGroup.Item>
          <ListGroup.Item className='cardBrand'>RAM {memoryRAM}GB</ListGroup.Item>
          <ListGroup.Item className='cardPrice'>${price.toFixed(2)}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <div className='containerButton'>
        <TiDelete className='CardIcon EditIcon' onClick={() => deleteFav(id)} />
        <BsCartFill className='CardIcon' onClick={() => addToCart(id, brand, line, model, price, stock, capacity, image, memoryRAM)} />
      </div>
    </Card>
  )
}
