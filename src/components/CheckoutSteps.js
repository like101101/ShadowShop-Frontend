import React from "react";
import { Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
    var progress = '0%'
    
    if (step4) {
        progress = '80%'
    }else if (step3){
         progress = '60%'
    }else if (step2){
         progress = '40%'
    }else if (step1){
         progress = '20%'
    }else{
         progress = '0%'
    }
    

   
  return (
    <Container>
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: progress}}></div>
        </div>
    <Nav className="justify-content-center mb-4">
      <Nav.Item >
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
            Login
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item >
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
    </Container>
    
  );
}

export default CheckoutSteps;
