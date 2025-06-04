import { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


interface Request {
  requestId: string;
  userId: string;
  itemId: string;
  requestStatus: string;
  requesteddate: string;       // You may convert this to Date if you're storing real date objects
  requestedtime: 'PENDING'|'APPROVED'|'REJECTED'|"";       // Consider using a time format or Date object if needed
   // strict type for status values
}

// interface RequestEditProps {
//   show: boolean;
//   selectedRow: Request | null;
//   handleClose: () => void;
//   handleUpdate: (updateRequest: Request) => void;
// }


function AddRequest({ show, handleClose, handleAdd,addRequest}: any) {
  //state management
  const [newRequest, setNewRequest] = useState<Request>({
    requestId: "",
    userId: "",
    itemId: "",
    requestStatus: "",
    requesteddate: "",
    requestedtime: "",
    
  });


  //add requestdata from form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setNewRequest((prev)=>({...prev,[name]:value}))
  }
  //handle add request data 
  const handleOnSubmit = async () => {
    try {
      const newRequestDetails = await addRequest(newRequest);
      handleAdd(newRequestDetails)
      handleClose()
      alert("Updted")
    }catch(err) {
      console.error("Failed to update the request",err)
    }
  }
  const renderFloatingTable= (label:string,name:keyof Request,type="text",readOnly=false) => (
    <FloatingLabel
      controlId="floatingInput" 
      label={label}
      className="mb-3"
    >
      <Form.Control
        type={type}
        name={name}
        value={newRequest[name]}
        onChange={handleOnChange}
      />
    </FloatingLabel>
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {/* {renderFloatingTable("Request Id", "requestId", "text", true)} */}
          {/* {renderFloatingTable("Request Id", "requestId")} */}
          {renderFloatingTable("User Id", "userId")}
          {renderFloatingTable("Item Id", "itemId")}
          {renderFloatingTable("Request status", "requestStatus")}
          {/* {renderFloatingTable("Requested Date", "requesteddate")}
          {renderFloatingTable("Requested Time", "requestedtime")} */}
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

export default AddRequest;