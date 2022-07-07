import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const navigate = useNavigate()
  
  const [address1, setAddress1] = useState(shippingAddress.address1);
  const [address2, setAddress2] = useState(shippingAddress.address2);
  const [city, setCity] = useState(shippingAddress.city);
  const [postal, setPostal] = useState(shippingAddress.postal);
  const [states, setStates] = useState(shippingAddress.states);



  const submitHandler = (e) => {
    //Need to be done
    e.preventDefault()
    dispatch(saveShippingAddress({address1,address2,city,postal,states}))
    navigate('/payment')
  };

  return (
    
    <FormContainer>
    <CheckoutSteps step1 step2/>
      <h1>Shipping Information</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address-1">
          <Form.Label className="mt-3">Address Line 1</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your address"
            value={address1 ? address1 : " "}
            onChange={(e) => setAddress1(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address-2">
          <Form.Label className="mt-3">Address Line 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Apt# or Mailbox#"
            value={address2 ? address2 : " "}
            onChange={(e) => setAddress2(e.target.value)}
          ></Form.Control>
        </Form.Group>{" "}
        <Row>
          <Col>
            <Form.Group controlId="city">
              <Form.Label className="mt-3">City</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your city"
                value={city ? city : " "}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="states">
              <Form.Label className="mt-3">State</Form.Label>

              <Form.Select
                value={states}
                onChange={(e) => setStates(e.target.value)}
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="postal">
          <Form.Label className="mt-3">Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your postal"
            value={postal ? postal : " "}
            onChange={(e) => setPostal(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="d-grid gap-2">
            <Button type="submit" className="bg-white btn-outline-primary mt-3">
            Continue
            </Button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
