import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confrimPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
  
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    
    useEffect(() => {
      if(userInfo){
          navigate(redirect)
      }
    }, [navigate, userInfo, redirect])
  
    const submitHandler = (e) => {
      e.preventDefault();

      if(password !== confrimPassword){
        setMessage('Passwords do not match')
      }else{
        dispatch(register(name, email, password))
      }
    };
  return (
    <FormContainer>
      <div className="text-center">
        <img alt="" src="/favicon.ico" width = "90" height="90" />{" "}
      </div>

      <h1 className="text-center">Shadow·Shop</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label className="mt-3">Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label className="mt-3">Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password-confirm">
          <Form.Label className="mt-3">Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Re-enter your password"
            value={confrimPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row className="py-3">
            <Col>Already a Shadow·Shop Customer? <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>
             Click here!</Link>
            </Col>

        </Row>
        <div className="d-grid gap-2">
            <Button type="submit" className="bg-white btn-outline-primary mt-3">
            Sign up
            </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen