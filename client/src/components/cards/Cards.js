import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";

const Cards = ({ item }) => {
  return (
    <Col lg="2" md="6" sm="4" className="mt-3">
      <Card className="cardThumb">
        <div class="boxthumb">
          <Card.Img className="imageThumb" variant="top" src={item.thumbnail} />
        </div>
        <Card.Body className="cardBody">
          <Card.Title className="titleCard">
            <div className="boxTitle">
              <p className="artis">{item.title}</p>
            </div>
            <p className="year">{item.year}</p>
          </Card.Title>
          <Card.Text className="textThumb">{item.artist?.name}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Cards;
