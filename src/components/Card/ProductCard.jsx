import { BsCartFill, BsStarFill } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'
import './Card.css'
import { addToFav, addToCart } from './favAndCart'

export default function ProductCard({id, brand, line, model, price, stock, capacity, image, memoryRAM}) {
  
  return (
    <Card className="card" >
      <Link className='containCardImage' to={"/detail/" + id}>
        <img className='cardImage' src={image} alt="" />
      </Link>
      <Card.Body className='containCardBody'>
        <Link to={"/detail/" + id}>
          <Card.Title className='containerName'>{model}</Card.Title>
        </Link>
        <ListGroup className='containerListDescription' variant="flush">
          <ListGroup.Item className='cardLine'>Line: {line}</ListGroup.Item>
          <ListGroup.Item className='cardStock'>RAM {memoryRAM}GB</ListGroup.Item>
          <ListGroup.Item className='cardCapacidad'>Memory {capacity}GB</ListGroup.Item>
          <ListGroup.Item className='cardStock'>Stock: {stock}</ListGroup.Item>
          <ListGroup.Item className='cardPrice'>${price.toFixed(2)}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <div className='containerButton'>
        <BsStarFill className='CardIcon' onClick={() => addToFav(id, brand, line, model, price, stock, capacity, image, memoryRAM)} />
        <BsCartFill className='CardIcon' onClick={() => addToCart(id, brand, line, model, price, stock, capacity, image, memoryRAM)} />
      </div>
    </Card>
  )
}