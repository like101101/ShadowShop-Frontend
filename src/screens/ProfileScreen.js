import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Image} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { getUserDetails, update_user_profile } from "../actions/userActions";
import { ListMyOrders } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import swal from "sweetalert";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const update_error = userUpdateProfile.error;
  const update_loading = userUpdateProfile.loading;

  useEffect(() => {
    dispatch(ListMyOrders());

    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        /** */
        if (success) {
          dispatch({
            type: USER_UPDATE_PROFILE_RESET,
          });
        }

        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confrimPassword) {
      setMessage("Passwords do not match");
    } else if (user.name === name && user.email === email && password === "") {
      swal({
        title: "No changes are made",
        button: "OK",
      });
    } else {
      dispatch(
        update_user_profile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {update_error && <Message variant="danger">{update_error}</Message>}
        {update_loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="mt-3">Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
          <Form.Group controlId="password-confirm">
            <Form.Label className="mt-3">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter your password"
              value={confrimPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" className="bg-white btn-outline-primary mt-3">
              Update
            </Button>
          </div>
        </Form>
      </Col>

      <Col md={7}>
        <h2 className="mb-4">My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          orders?.map((order) => (
            <div key={order._id}>
              <div className="card bg-secondary mb-3">
                <div className="card-header">
                  <Row>
                    <Col><small>Order Placed: </small></Col>
                    <Col><small>Total: </small></Col>
                    <Col><small>Status: </small></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col><small>{order.createAt.slice(0,10)}</small></Col>
                    <Col><small>${order.totalPrice}</small></Col>
                    <Col><small>{order.isDelivered? order.deliveredAt?order.deliveredAt.slice(0,10):"Delivering":"Preparing"}</small></Col>
                    <Col></Col>
                  </Row>
                </div>
                <div className="card-body">
                <div>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className='mt-2'>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        
                      </Row>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
