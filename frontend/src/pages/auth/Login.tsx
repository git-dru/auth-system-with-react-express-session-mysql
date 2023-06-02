import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import { login, getSession } from "../../redux/actions/userAction";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(email, password));
    navigate("/home");
  };

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Do not have an account?
              <Link to={`/register`}> Register</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
