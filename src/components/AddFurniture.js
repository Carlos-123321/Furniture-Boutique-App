import { useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import _ from "lodash";
import './AddFurniture.css';
import './Buttons.css';

export default function AddFurniture({ addFurniture, designerOptions }) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    console.log("hello from add furniture save");
    event.preventDefault(); 
    console.log(event);
    console.log("Name is: " + event.target[0].value);
    console.log("ImageURL is: " + event.target[3].value);
    console.log("Designer is: " + event.target[4].value);


    var url = "https://picsum.photos/200/300";

    if (event.target[3].value && event.target[3].value !== "") {
      url = event.target[3].value;
    }
    
    var designer = designerOptions.find(
      (designer) => designer.name === event.target[4].value
    );

    //Callback function in FurnitureList. (How we sent those back to the parent).
    addFurniture(
      event.target[0].value,
      event.target[1].value,
      event.target[2].value,
      url,
      designer.designerId
    );

    handleClose();
  };

  return (
    <>
      <Button className="addFurnitureButton" onClick={handleShow}>
        Add Furniture
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        
        <Modal.Header closeButton>
          <Modal.Title>Add Furniture</Modal.Title>
        </Modal.Header>
        <div className="modal-content wood2-background">
        <Modal.Body>
          <Form id="addmodal" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Velvet Sofa" required type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                placeholder="$"
                required
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridMaterial">
              <Form.Label>Material</Form.Label>
              <Form.Control
                placeholder="Mahogany"
                required
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridImageURL">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                placeholder="http://google.com"
                required
                type="url"
              />
            </Form.Group>

            <Row className="mb-3">
            

              <Form.Group as={Col} controlId="formGridDesigner">
                <Form.Label>Designer</Form.Label>
                <Form.Select required defaultValue="Choose...">
                  <option value="">Choose...</option>
                  {designerOptions &&
                    designerOptions.map((designer, i) => {
                      return (
                        <option key={i} value={designer.name}>
                          {designer.name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
            </Row>
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