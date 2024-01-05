import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import {hotelDataService} from "../../services/service";
import Cookies from "js-cookie";

const AddFood = ({ id, setFoodId }) => {
  const [hotelName, setHotelname] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [edibleFood, setEdibleFood] = useState("");
  const [nonEdibleFood, setNonEdibleFood] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (hotelName === "" || location === "" || phoneNum ==="" || edibleFood ===""  || nonEdibleFood ==="") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const email = await Cookies.get("userEmail")
    const profileImageUrl = await Cookies.get("userProfile")
    
    const newHotel = {
      hotelName,
      location,
      email,
      phoneNum,
      edibleFood,
      nonEdibleFood,
      status,
      profileImageUrl
    };
    console.log(newHotel);

    try {
      if (id !== undefined && id !== "") {
        await hotelDataService.updateHotel(id, newHotel);
        setFoodId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await hotelDataService.addHotels(newHotel);
        setMessage({ error: false, msg: "New Hotel added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
 
    setHotelname("");
    setLocation("");
    setPhoneNum("");
    setEdibleFood("");
    setNonEdibleFood("");

  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await hotelDataService.getHotel(id);
      setHotelname(docSnap.data().hotelName);
      setLocation(docSnap.data().location);
      setPhoneNum(docSnap.data().phoneNum);
      setEdibleFood(docSnap.data().edibleFood);
      setNonEdibleFood(docSnap.data().nonEdibleFood);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id ]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formHotelTitle">
            <InputGroup>
              <InputGroup.Text id="formHotelTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Hotel Name"
                value={hotelName}
                onChange={(e) => setHotelname(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHotelTitle">
            <InputGroup>
              <InputGroup.Text id="formHotelTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHotelTitle">
            <InputGroup>
              <InputGroup.Text id="formHotelTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Phone-No"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHotelTitle">
            <InputGroup>
              <InputGroup.Text id="formHotelTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Edible-Food"
                value={edibleFood}
                onChange={(e) => setEdibleFood(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHotelTitle">
            <InputGroup>
              <InputGroup.Text id="formHotelTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Non-Edible-Food"
                value={nonEdibleFood}
                onChange={(e) => setNonEdibleFood(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddFood;