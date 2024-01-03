import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Navb from "./Essentials/Navbar";
import FoodsList from "./FoodsList";
import AddFood from "./Composter/AddComposter";
import ComposterList from "./Composter/ComposterList";
import { useState } from "react";
import Footer from "./Essentials/footer";

function Composter() {

  const [composterId, setComposterId] = useState("");
  const [selectedOption, setSelectedOption] = useState("Buy"); // Default option

  const getComposterIdHandler = (id) => {
    console.log("The ID of the document to be edited: ", id);
    setComposterId(id);
  };


  const handleDropdownChange = (eventKey) => {
    setSelectedOption(eventKey);
  };


  return (
    <>
      <Navb />

      <Container>
        <h2 className="text-center mt-5">Composter</h2>
        <p className="text-center mb-4">Welcome to the Composter's Dashboard. Here, you can manage information related to composting.</p>
      </Container>

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Dropdown onSelect={handleDropdownChange}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selectedOption === "Buy" ? "Buy" : "Sell"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Buy">Buy</Dropdown.Item>
                <Dropdown.Item eventKey="Sell">Sell</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      {selectedOption === "Buy" ? (
        <Container className="my-5">
          <h4 className="text-center text-white mt-5 p-3 bg-dark rounded">Food List</h4>
          <Row>
            <Col>
              <FoodsList isComposter={true} />
            </Col>
          </Row>
        </Container>
      ) : (<>
        <Container className="mt-5" style={{ width: "400px", backgroundColor: "white", borderRadius: '20px' }}>
          <Row>
            <Col>
              <AddFood id={composterId} setComposterId={setComposterId} />
            </Col>
          </Row>
        </Container>
        <Container className="my-5">
          <h4 className="text-center text-white mt-5 p-3 bg-dark rounded">Composter List</h4>
          <Row>
            <Col>
              <ComposterList getComposterId={getComposterIdHandler} />
            </Col>
          </Row>
        </Container></>
      )}

      <Footer />
    </>

  );
}

export default Composter;


