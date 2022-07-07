import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { addToCart,removeFromCart } from '../actions/cartActions'
import swal from 'sweetalert';


function CartScreen() {
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.userLogin.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cartItems} = cart

  const removeFromCartHandler = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(removeFromCart(id))
        swal({
          title: "Removed From Cart",
          icon: "success",
        })
      }
    })
  }

  const checkoutHandler = () => {
    if (user == null){
      swal({
        title: "Login in to proceed checkout",
        icon: "info",
        buttons: ["Go Back", "Login"],
      }).then((login) => {
        if (login){
          navigate("/login");
        }
      })
    }else{
      navigate("/shipping");
    }
    
  }
  return (
    <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className="alert alert-dismissible alert-info">
              <Row>
                <h2> Your cart is empty! </h2>
              </Row>
                <Row>
                <Col>
                  <Link to="/" className="btn btn-dark">
                      Go Shopping
                  </Link>
                </Col>
                <Col>
                </Col>
              </Row>
            </div>
          ):(

            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product} className="mb-3">
          
                  <Row >
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col >
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={3}>
                      <Form.Control 
                        as="select" 
                        value = {item.qty} 
                        onChange = {(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                          {
                            [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x+1} value={x+1}>
                                {x+1}
                              </option>
                            ))
                          }
                      
                        </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button type='button' className='btn btn-danger' onClick={() => removeFromCartHandler(item.product)}>
                          <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
     
                </ListGroup.Item>
              ))}

            </ListGroup>

          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item key='subtotal'>
                <h5>subtotal ({cartItems.reduce((acc, item) => acc+ item.qty, 0)} items): </h5>
                {cartItems.map((item) =>(
                  <p key={item.product} align="right"><small>{item.qty} * {item.price}</small>
                    
                  </p>
                ))}
                <hr></hr>
                <h3 align="right">${cartItems.reduce((acc, item) => acc+ item.qty*item.price, 0).toFixed(2)}</h3>
              </ListGroup.Item>
              <ListGroup.Item key='checkout'>
                <Button style={{width:"100%"}} variant="success" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Procced To checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
    </Row>
  )
}

export default CartScreen