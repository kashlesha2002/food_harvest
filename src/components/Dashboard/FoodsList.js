import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../../services/book.services";

const FoodsList = ({ getFoodId }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);
 
  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getBooks}>
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
            <th>Edible-Food</th>
            <th>Non-Edible-Food</th>
            <th>Status</th>
            {getFoodId && <th>Action</th>}
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
                <td>{doc.edibleFood}</td>
                <td>{doc.nonEdibleFood}</td>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default FoodsList;
