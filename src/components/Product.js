import React from "react";
import { Card } from "react-bootstrap";
import "../bootstrap.min.css";
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
  return (
        <Card className="border-light mb-3" style={{ "maxWidth": "20rem" }}>
          <Link to={`/product/${product._id}`} className="card-body">
            <Card.Img src={product.image} />
          </Link>
          <Card.Body className="card-body">
            <Link to={`/product/${product._id}`} style={{"textDecoration": "none"}}>
                <h6 className="card-title">
                    {product.name}
                </h6>
            </Link>
            <Card.Text as="div" className="card-text">
              <div className="my-3">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
              </div>
            </Card.Text>
            <Card.Text as='h3' className="card-text">
                ${product.price}
            </Card.Text>
          </Card.Body>
        </Card>
  );
}

export default Product;
