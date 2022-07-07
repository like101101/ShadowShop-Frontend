import React, { useEffect, useState} from "react";
import { Link, useParams,useNavigate, goBack } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import swal from 'sweetalert';
import { addToCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'


function ProductScreen() {
  const [qty, setQty] = useState(1)

  const { id } = useParams();
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const navigate = useNavigate();
 


  useEffect(() => {
    dispatch(listProductDetails(id))

  // eslint-disable-next-line
  }, [dispatch, id]) 

  const addToCartHandler = () =>{
    const productId = id
    dispatch(addToCart(productId, qty))
  
    swal({
      title: "Successfully Added to cart",
      icon: "success",
      buttons: ["Continue", "Go to Check Out"],
    }).then((checkout) => {
      if (checkout){
        navigate("/cart");
      }
    })
  }

  const inStockStatus = (s) => {
    if (s > 0) {
      return <p className="text-success">In Stock</p>;
    } else {
      return <p className="text-danger">Out of Stock</p>;
    }
  }

  const inStockButton = (s) => {
    if (s > 0) {
      return (
        <Button type="button" className="btn btn-info" onClick={addToCartHandler}>
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

  return (
    <div>
      <Button onClick={() => navigate(-1)} className="btn btn-outline-secondary bg-secondary">
        Go Back
      </Button>
      {loading ? (<Loader />)
      : error ? (<Message variant='danger'>{error}</Message>)
      :(
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
              { product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control 
                      as="select" 
                      value = {qty} 
                      onChange = {(e) => setQty(e.target.value)}
                      size="sm">
                        {
                          [...Array(product.countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))
                        }
                    
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                {inStockButton(product.countInStock)}
              </ListGroup.Item>
             
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )

      }
      
    </div>
  );
}

export default ProductScreen;
