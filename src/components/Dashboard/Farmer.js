import { Container} from "react-bootstrap";
import Navb from "./Essentials/Navbar";

function Farmer() {
 

  return (
    <>
      <Navb />

      <Container style={{ width: "400px" }}>
      <h2 className="text-center mt-5">Farmer</h2>
        <p className="text-center mb-4">Welcome to the Farmer's Dashboard. You can add and manage your farm-related information here.</p>
       
      </Container>
    </>
  );
}

export default Farmer;
