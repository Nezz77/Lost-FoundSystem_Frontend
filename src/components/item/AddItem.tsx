import { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import Swal from 'sweetalert2';


interface Item {
  id: string;
  name: string;
  description: string;
  date: string;       // You may convert this to Date if you're storing real date objects
  time: string;       // Consider using a time format or Date object if needed
  itemStatus: 'LOST' | 'FOUND' | 'CLAIMED' | ""; // strict type for status values
}

// interface ItemEditProps {
//   show: boolean;
//   selectedRow: Item | null;
//   handleClose: () => void;
//   handleUpdate: (updateItem: Item) => void;
// }


function AddItem({ show, handleClose, handleAdd, addItem }: any) {
  //state management
  const [newItem, setNewItem] = useState<Item>({
    id: "",
    name: "",
    description: "",
    date: "",
    time: "",
    itemStatus: "",
  });


  //add itemdata from form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }
  //handle add item data 
  const handleOnSubmit = async () => {
    try {
      const newItemDetails = await addItem(newItem);
      handleAdd(newItemDetails)
      handleClose()
      Swal.fire({
        title: "Successfully Added!",
        icon: "success",
        draggable: true
      });
    } catch (err) {
      console.error("Failed to update the item", err)
    }
  }
  const renderFloatingTable = (label: string, name: keyof Item, type = "text", readOnly = false) => (
    <FloatingLabel
      controlId="floatingInput"
      label={label}
      className="mb-3"
    >
      <Form.Control
        type={type}
        name={name}
        value={newItem[name]}
        onChange={handleOnChange}
      />
    </FloatingLabel>
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {/* {renderFloatingTable("Item Id", "id", "text", true)} */}
          {renderFloatingTable("Item Name", "name")}
          {renderFloatingTable("Item Description", "description")}
          {renderFloatingTable("Date", "date")}
          {renderFloatingTable("Time", "time")}
          <FloatingLabel controlId="floating-itemRole" label="Item Role" className="mb-3">
            <Form.Select name="itemStatus" value={newItem.itemStatus} onChange={handleOnChange}>

              <option value="LOST">LOST</option>
              <option value="FOUND">FOUND</option>
              <option value="CLAIMED">CLAIMED</option>

            </Form.Select>
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