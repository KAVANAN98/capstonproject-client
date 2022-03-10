import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Navigationbar from "./Navigationbar";

const Loginpage = () => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const [error, setError] = useState("");
  const [loginuser, setloginuser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;

    let copy = { ...loginuser, [name]: value };
    // console.log(copy);
    setloginuser(copy);
  };
  // console.log(loginuser);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(loginuser));
    console.log(loginuser, "=============login");
    login();
  };

  const validate = (values) => {
    let err = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      err.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      err.email = "This is not a valid email format!";
    }
    if (!values.password) {
      err.password = "Password is required";
    } else if (values.password.length < 4) {
      err.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      err.password = "Password cannot exceed more than 10 characters";
    }
    return err;
  };

  // const UserLogin = () => {
  //   setloginuser({
  //     email: email.current.value,
  //     password: password.current.value,
  //   });
  //   console.log(loginuser);
  //   login();
  // };

  const login = async () => {
    const { email, password } = loginuser;

    try {
      const data = await axios.post("/login", { email, password });
      console.log("data>>", data.data);
      const role = data.data.role;
      const token = data.data.token;
      console.log(role);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", token);

      if (data.data.error) {
        console.log(data.data.message);
        // alert(data.data.message);
      } else {
        alert(data.data.message);
        history.push("/Samples");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(error);

  useEffect(() => {
    // console.log(loginuser);
    // login();
  }, []);

  return (

    <>

      <Navigationbar />
      <Container >

        <Card className="formcard p-5">
          <Row className="d-flex justify-content-between">

            <Col xs={12} md={6}>
              <img width="100%" height="100%" src="loginimg.jpg" alt="loginimage" />
            </Col>

            <Col xs={12} md={6}>

              <Form method="POST">
                <h4>Login Here!</h4>
                <Card.Body>
                  <FloatingLabel
                    // controlId="floatingInput"
                    label={<FaEnvelope />}
                    className="mt-5 mb-4"
                  >

                    <Form.Control
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="enter email"
                      ref={email}
                    />
                    <span style={{ color: "red" }}>{error.email}</span>
                  </FloatingLabel>

                  <FloatingLabel
                    // controlId="floatingInput"
                    label={<FaLock />}
                    className="mb-4"
                  >
                    <Form.Control
                      name="password"
                      onChange={handleChange}
                      type="password"
                      placeholder="enter password"
                      ref={password}
                    />
                    <span style={{ color: "red" }}>{error.password}</span>
                  </FloatingLabel>

                  <div className="d-flex justify-content-center">
                    <Button
                      variant="outline-success"
                      onClick={handleSubmit}
                      className="mt-3"
                      id="Login"
                    >
                      {" "}
                      Sign Up{" "}
                    </Button>
                  </div>
                </Card.Body>

              </Form>

            </Col>

          </Row>


        </Card>


      </Container>
    </>

  );
};

export default Loginpage;
