import React from "react";
import { Card } from "react-bootstrap";
import "../bootstrap.min.css";

function Product({ product }) {
  return (
    <div class="card border-light mb-3" style={{ "max-width": "20rem" }}>
      <div class="card-body">
        <Card>
          <a href={`/product/${product._id}`} >
            <Card.Img src={product.image} />
          </a>
          <Card.Body>
            <a href={`/product/${product._id}`} style={{"text-decoration": "none"}}>
                <h6 class="card-title">
                    {product.name}
                </h6>
            </a>
            <Card.Text as="div">
              <div className="my-3">
                {product.rating} from {product.numReviews} reviews
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
