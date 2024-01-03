import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddFood from "./AddFood";
import FoodsList from "./FoodsList";
import Navb from "./Essentials/Navbar";
import Footer from "./Essentials/footer";

function Dashboard() {
  const [foodId, setFoodId] = useState("");

  const getFoodIdHandler = (id) => {
    console.log("The ID of the document to be edited: ", id);
    setFoodId(id);
  };

  return (
    <>
     <Navb/>

      <Container className="mt-5" style={{ width: "400px", backgroundColor: "white", borderRadius: '20px' }}>
        <Row>
          <Col>
            <AddFood id={foodId} setFoodId={setFoodId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <FoodsList getFoodId ={getFoodIdHandler} isHotel={true} />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Dashboard;
