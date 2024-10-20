import { useState, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col } from "react-bootstrap";
import _ from "lodash";
import countryList from "react-select-country-list";
import './AddFurniture.css';
import './Buttons.css';
import './EditFurniture.css';

export default function AddDesigner({addDesigner}) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const countries = useMemo(() => countryList().getData(), [])


  const handleSubmit = (event) => {
    console.log("hello from add designer save");
    event.preventDefault(); 
    console.log(event);
    console.log("Name is: " + event.target[0].value);
    console.log("ImageURL is: " + event.target[1].value);
    console.log("ReleaseYear is: " + event.target[2].value);
    console.log("Director is: " + event.target[3].value);


    var url = "https://picsum.photos/200/300";

    if (event.target[3].value && event.target[3].value !== "") {
      url = event.target[3].value;
    }

    addDesigner(
      event.target[0].value,
      event.target[1].value,
      event.target[2].value,
      url,
    )
    
    handleClose();
  };

  return (
    <>
      <Button className="addFurnitureButton" onClick={handleShow}>
        Add Designer
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Designer</Modal.Title>
        </Modal.Header>
        <div className="modal-content wood2-background">
        <Modal.Body>
          <Form id="addmodal" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Aria Montclair" required type="text" />
            </Form.Group>

              <Form.Group className="mb-3" as={Col} controlId="formGridDoB">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date"
                required
                max={new Intl.DateTimeFormat('en-CA').format(new Date())}/>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Select required defaultValue="Choose...">
                  <option value="">Choose...</option>
                  {countries.map((country, i) => {
                    return (
                      <option key={i} value={country.label}>
                        {country.label}
                      </option>
                    );
                  })}
                </Form.Select>
                </Form.Group>
            
            <Form.Group className="mb-3" controlId="formGridImageURL">
              <Form.Label>Image URL</Form.Label>
              <Form.Control placeholder="http://google.com" required type="url"/>
            </Form.Group>

            
          
          </Form>
        </Modal.Body>
        </div>
        <Modal.Footer>
          <Button className="closeButton" onClick={handleClose}>
            Close
          </Button>
          <Button form="addmodal" className="saveButton" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}