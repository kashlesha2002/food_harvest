import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { hotelDataService } from "../../services/service";
import Cookies from "js-cookie";
import { BsArrowRepeat } from 'react-icons/bs';

const FoodsList = ({ getFoodId, isComposter, isHotel, isNgo }) => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getHotels();
  }, []);
       
  const getHotels = async () => {
    const data = await hotelDataService.getAllHotels();
    setHotels(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
   
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHotels = hotels.filter((doc) =>
    doc.location.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const deleteHandler = async (id) => {
    await hotelDataService.deleteHotel(id);
    getHotels();
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between mb-2">
        <div className="d-flex align-items-center">
        <BsArrowRepeat
            className="refresh-icon m-2 font-bold p-2"
            onClick={getHotels}
            title="Refresh List"
          />
          <input
            type="text"
            className="form-control m-2"
            placeholder="Search by location..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {filteredHotels.map((doc, index) => (
          <Card key={doc.id} className="m-2" style={{ width: "18rem", borderRadius: "16px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <Card.Body>
              <Card.Img variant="top" src={doc.profileImageUrl} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "16px 16px 0 0" }} />
              <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{doc.hotelName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{doc.location}</Card.Subtitle>
              <Card.Text>
                Email: {doc.email}
                <br />
                Phone-no: {doc.phoneNum}
                <br />
                {isHotel && (
                  <>
                    Edible-Food: {doc.edibleFood}
                    <br />
                    Non-Edible-Food: {doc.nonEdibleFood}
                    <br />
                  </>
                )}
                {isComposter && <>Non-Edible-Food: {doc.nonEdibleFood}<br /></>}
                {isNgo && <>Edible-Food: {doc.edibleFood}<br /></>}
                Status: {doc.status}
              </Card.Text>
              {getFoodId && (
                doc.email === Cookies.get("userEmail") ? (
                  <>
                    <Button
                      variant="success"
                      className="edit m-2"
                      onClick={(e) => getFoodId(doc.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="delete m-2"
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  "---"
                )
              )}
              {!getFoodId && (
                <>
                  <Button variant="success" className="edit m-2">
                    <a className="text-white edit m-2" href={`tel:${doc.phoneNum}`}>
                      Call
                    </a>
                  </Button>
                  <Button variant="success" className="edit m-2">
                    <a className="text-white" href={`mailto:${doc.email}`}>
                      Mail
                    </a>
                  </Button>
                  <Button variant="info" className="edit m-2">
                    <a
                      className="text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${doc.location}`}
                    >
                      Maps
                    </a>
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default FoodsList;
