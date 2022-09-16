import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCelulares } from '../../redux/actions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import Card from '../Card/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardContainer = () => {
  const dispatch = useDispatch();
  const allCards = useSelector((state) => state.allCell);

  useEffect(() => {
    dispatch(getCelulares())
  })

  return (
    <div className="" >
      {allCards?.map((e, index) => {
        return (
          <Card className="" style={{ width: '23rem' }}>
            <Card.Img variant="top" src={e.image} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

export default CardContainer
