import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import {bookDataService} from "../../services/service";

const FoodsList = ({ getFoodId, isComposter, isHotel, isNgo }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);
 
  const getBooks = async () => {
    const data = await bookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await bookDataService.deleteBook(id);
    getBooks();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit p-2" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Phone-no</th>
            {isHotel && (<><th>Edible-Food</th> <th>Non-Edible-Food</th></>)}
            {isComposter && <th>Non-Edible-Food</th>}
            {isNgo && <th>Edible-Food</th>}
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.hotelName}</td>
                <td>{doc.location}</td>
                <td>{doc.email}</td>
                <td>{doc.phoneNum}</td>
                {isHotel && (<><td>{doc.edibleFood}</td> <td>{doc.nonEdibleFood}</td></>)}
                {isComposter && <td>{doc.nonEdibleFood}</td>}
                {isNgo && <td>{doc.edibleFood}</td> }
                <td>{doc.status}</td>
                {getFoodId && (
                  <td>
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
                  </td>
                )}
                {
                  !getFoodId && (
                    <td>
                      <Button
                        variant="success"
                        className="edit m-2"
                      >
                       <a className="text-white edit m-2" href={`tel:${doc.phoneNum}`}>Call</a>
                      </Button>
                      <Button
                        variant="success"
                        className="edit m-2"
                        >
                          <a className="text-white" href={`mailto:${doc.email}`}>Mail</a>
                        </Button>
                    </td>
                  )
                }
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default FoodsList;
