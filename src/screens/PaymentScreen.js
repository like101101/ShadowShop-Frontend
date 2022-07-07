import React from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
//import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.userLogin.userInfo)
    const {shippingAddress} = cart
    const navigate = useNavigate()

    if(!shippingAddress.address1){
        navigate('/shipping')
    }

    if (user == null){
        navigate('/login')
    }
  

  const submitHandler = (e) => {
    //Need to be done
    e.preventDefault()
    //dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  };

  return (
    
    <FormContainer>
    <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <PayPalScriptProvider >
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
      <Form onSubmit={submitHandler}>

        <div className="d-grid gap-2">
            <Button type="submit" className="bg-white btn-outline-primary mt-3">
            Continue
            </Button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
