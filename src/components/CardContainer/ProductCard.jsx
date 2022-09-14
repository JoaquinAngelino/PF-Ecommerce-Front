import { BsCartFill, BsStarFill } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'

export default function ProductCard({ id, linea, modelo, precio, capacidad, imagen, stock }) {


  return (
    <Card className="card" >
      <Link className='containCardImage' to={"/detail/" + id}>
        <img className='cardImage' src={imagen} alt="" />
      </Link>
      <Card.Body className='containCardBody'>
        <Link to={"/detail/" + id}>
          <Card.Title className='containerName'>{modelo}</Card.Title>
        </Link>
        <ListGroup className='containerListDescription' variant="flush">
          <ListGroup.Item className='cardStock'>{stock}</ListGroup.Item>
          <ListGroup.Item className='cardLinea'>{linea}</ListGroup.Item>
          <ListGroup.Item className='cardCapacidad'>{capacidad}</ListGroup.Item>
          <ListGroup.Item className='cardprecio'>${precio}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <div className='containerButton'>
        <BsStarFill className='CardIcon' />
        <BsCartFill className='CardIcon' />
      </div>
    </Card>
  )
}