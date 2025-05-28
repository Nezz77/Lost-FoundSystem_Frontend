import { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


interface Item {
  id: string;
  name: string;
  description: string;
  date: string;       // You may convert this to Date if you're storing real date objects
  time: string;       // Consider using a time format or Date object if needed
  status: string; // strict type for status values
}

// interface ItemEditProps {
//   show: boolean;
//   selectedRow: Item | null;
//   handleClose: () => void;
//   handleUpdate: (updateItem: Item) => void;
// }


function AddItem({ show, handleClose, handleAdd,addItem}: any) {
  //state management
  const [newItem, setNewItem] = useState<Item>({
    id: "",
    name: "",
    description: "",
    date: "",
    time: "",
    status: "",
  });


  //add itemdata from form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setNewItem((prev)=>({...prev,[name]:value}))
  }
  //handle add item data 
  const handleOnSubmit = async () => {
    try {
      const newItemDetails = await addItem(newItem);
      handleAdd(newItemDetails)
      handleClose()
      alert("Updted")
    }catch(err) {
      console.error("Failed to update the item",err)
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <FloatingLabel
            controlId="floatingInput"
            label="Item Name"
            className="mb-3"
          >
            <Form.Control

              type="text"
              name="name"
              value={newItem.name}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Item Description"
            className="mb-3"
          >
            <Form.Control

              type="text"
              name="description"
              value={newItem.description}
              onChange={handleOnChange}
            />
          </FloatingLabel>


          <FloatingLabel
            controlId="floatingInput"
            label=" Date"
            className="mb-3"
          >
            <Form.Control

              type="text"
              name="date"
              value={newItem.date}
              onChange={handleOnChange}
            />
          </FloatingLabel>


          <FloatingLabel
            controlId="floatingInput"
            label="Time"
            className="mb-3"
          >
            <Form.Control

              type="text"
              name="time"
              value={newItem.time}
              onChange={handleOnChange}
            />
          </FloatingLabel>


          <FloatingLabel
            controlId="floatingInput"
            label="Item status"
            className="mb-3"
          >
            <Form.Control

              type="text"
              name="status"
              value={newItem.status}
              onChange={handleOnChange}
            />
          </FloatingLabel>


        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSubmit}>
          Save 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddItem;