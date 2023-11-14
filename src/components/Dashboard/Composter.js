import { Container, Row, Col } from "react-bootstrap";
import Navb from "./Essentials/Navbar";
import FoodsList from "./FoodsList";

function Composter() {
  return (
    <>
      <Navb />

      <Container style={{ width: "400px" }}>
        <h2 className="text-center mt-5">Composter</h2>
        <p className="text-center mb-4">Welcome to the Composter's Dashboard. Here, you can manage information related to composting.</p>
      </Container>
      <Container>
        <Row>
          <Col>
            <FoodsList />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Composter;
