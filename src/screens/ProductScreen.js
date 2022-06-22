import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

function inStockStatus(s) {
  if (s > 0) {
    return <p className="text-success">In Stock</p>;
  } else {
    return <p className="text-danger">Out of Stock</p>;
  }
}

function inStockButton(s) {
  if (s > 0) {
    return (
      <Button type="button" className="btn btn-info">
        Add to Cart
      </Button>
    );
  } else {
    return (
      <Button type="button" className="btn btn-info disabled">
        Add to Cart
      </Button>
    );
  }
}

function ProductScreen() {

  const { id } = useParams();
  const [product, setProduct] = useState([])

  useEffect(() => {
    async function fetchProduct(){
      const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
      setProduct(data);
    }

    fetchProduct()
 
    
  }, [])

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
            <ListGroup.Item>
              <h4>{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Price: ${product.price}</h5>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
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
                <Col>{inStockStatus(product.countInStock)}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                {inStockButton(product.countInStock)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
