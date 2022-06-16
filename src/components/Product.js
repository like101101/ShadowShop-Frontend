import React from "react";
import { Card } from "react-bootstrap";
import "../bootstrap.min.css";
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
  return (
    <div className="card border-primary mb-3" style={{ "maxWidth": "20rem" }}>
      <div className="card-body">
        <Card>
          <Link to={`/product/${product._id}`} >
            <Card.Img src={product.image} />
          </Link>
          <Card.Body>
            <Link to={`/product/${product._id}`} style={{"textDecoration": "none"}}>
                <h6 className="card-title">
                    {product.name}
                </h6>
            </Link>
            <Card.Text as="div">
              <div className="my-3">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
              </div>
            </Card.Text>
            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Product;
