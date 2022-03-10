import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const EditUser = ({ data, setshowedit, showedit, getdata }) => {

  const [register, setregister] = useState({});
  // const [updata, setupdata] = useState();

  const history = useHistory();

  const name = useRef();
  const password = useRef();


  const sampleAdd = () => {
    if (data) {
      setregister({
        name: name.current.value,
        password: password.current.value,
        id: data._id,
      });
    }

    console.log(register);
    registeruser();
  };

  const [error, setError] = useState("");

  const [reg, setReg] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    let copy = { ...reg, [name]: value };
    console.log(copy);
    setReg(copy);
  };

  const handleSubmit = (e) => {
    setError(validate(reg));
    sampleAdd();
    console.log(register, "----------");
  };

  const validate = (values) => {
    let err = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      err.username = "Username is required!";
    }


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

  const registeruser = async () => {
    try {
      const { name, password, id } = register;


      if (name || password) {

        const data = await axios.post("/updateuser", { name, password, id });
        console.log(data, "------data");
        console.log("res", data.data.error);
        if (data.data.error) {
          console.log(data.data.message);
          alert(data.data.message);
        } else {
          getdata();
          setshowedit(false);
          alert(data.data.message);
          history.push("/Samples");
        }
      } else {
        console.log("update to else part")
      }
    } catch (err) {
      console.log(err);
    }
  };



  console.log(data && data, "------------edit data");
  console.log(data && data._id, "------------edit id");

  return (
    <div>
      <Modal
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showedit}
      >
        <Modal.Title> Update {data && data.name} details </Modal.Title>

        <Modal.Body>
          <Form method="POST">
            {data && (
              <>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter name"
                  className="mt-3 mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="enter name"
                    ref={name}
                    name="name"
                    defaultValue={data.name}
                    onChange={handleChange}
                  />

                  <span style={{ color: "red" }}>{error.name}</span>
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter password"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="enter password"
                    ref={password}
                    defaultValue={data.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <span>{error.password}</span>
                </FloatingLabel>


              </>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-primary"
            className="mt-2"
            onClick={() => {
              handleSubmit();
            }}
          >
            {" "}
            Save Changes{" "}
          </Button>
          <Button onClick={() => { setshowedit(false) }}>close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUser;
