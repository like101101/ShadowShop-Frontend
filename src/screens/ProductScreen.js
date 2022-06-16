import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

function inStock( s ) {
  if (s> 0){
    return (
      <p className="text-success">In Stock</p>
    );
  }else{
    return(
      <p className="text-danger">Out of Stock</p>
    );
  }

}

function ProductScreen() {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  return (
    <div>
      <Link to="/" className="btn btn-secondary my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item >
              <h4>{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item >
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Price: ${product.price}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Col>Price: </Col>
                <Col>
                <strong>${product.price}</strong>
                </Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Status: </Col>
                <Col>
                 {inStock(product.countInStock)}
                </Col>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
