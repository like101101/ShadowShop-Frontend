import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin
  
  useEffect(() => {
    if(userInfo){
        navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  };

  return (
    <FormContainer>
      <div className="text-center">
        <img alt="" src="/favicon.ico" width = "90" height="90" />{" "}
      </div>

      <h1 className="text-center">Shadow·Shop</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label className="mt-3">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row className="py-3">
            <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>
             Click here!</Link>
            </Col>

        </Row>
        <div className="d-grid gap-2">
            <Button type="submit" className="bg-white btn-outline-primary mt-3">
            LOG IN
            </Button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
