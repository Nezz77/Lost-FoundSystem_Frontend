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

interface ItemEditProps {
  show: boolean;
  selectedRow: Item | null;
  handleClose: () => void;
  handleUpdate: (updateItem: Item) => void;
  updateItems:(item: Item) => Promise<Item>; 
}


function EditItem({ show, selectedRow, handleClose, handleUpdate,updateItems  }: ItemEditProps) {
  //state management
  const [item, setItem] = useState<Item>({
    id: "",
    name: "",
    description: "",
    date: "",
    time: "",
    status: "",
  });
  useEffect(() => {
    if (selectedRow) {
      setItem({ ...selectedRow })
    }
  }, [selectedRow])

  //add itemdata from form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }
  //handle update data 
  const handleSave = async () => {
    try {
      const updatedItem = await updateItems(item);
      handleUpdate(item )
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
            label="Item Id"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name="id"
              value={item.id}
              onChange={handleOnChange}
            />
          </FloatingLabel>


          <FloatingLabel
            controlId="floatingInput"
            label="Item Name"
            className="mb-3"
          >
            <Form.Control

              type="text"
              name="name"
              value={item.name}
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
              value={item.description}
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
              value={item.date}
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
              value={item.time}
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
              value={item.status}
              onChange={handleOnChange}
            />
          </FloatingLabel>


        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditItem;