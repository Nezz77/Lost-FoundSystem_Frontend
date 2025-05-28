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
  handleUpdate: (updatedItem: Item) => void;
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
  const renderFloatingTable= (label:string,name:keyof Item,type="text",readOnly=false) => (
    <FloatingLabel
            controlId="floatingInput"
            label={label}
            className="mb-3"
          >
            <Form.Control
              type={type}
              name={name}
              value={item[name]}
              onChange={handleOnChange}
              readOnly={readOnly}
            />
          </FloatingLabel>
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {renderFloatingTable ("Item Id", "id", "text", true)}
          {renderFloatingTable ("Item Name", "name")}
          {renderFloatingTable ("Item Description", "description")}
          {renderFloatingTable ("Date", "date")}
          {renderFloatingTable ("Time", "time")}
          {renderFloatingTable ("Item status", "status")}
          
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