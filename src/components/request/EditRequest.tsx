import { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import Swal from 'sweetalert2';


interface Request {
  requestId: string;
  userId: string;
  itemId: string;
  requesteddate: string;       // You may convert this to Date if you're storing real date objects
  requestedtime: string;       // Consider using a time format or Date object if needed
  requestStatus: string; // strict type for status values
}

interface RequestEditProps {
  show: boolean;
  selectedRow: Request | null;
  handleClose: () => void;
  handleUpdate: (updatedRequest: Request) => void;
  updateRequests: (request: Request) => Promise<Request>;
}


function EditRequest({ show, selectedRow, handleClose, handleUpdate, updateRequests }: RequestEditProps) {
  //state management
  const [request, setRequest] = useState<Request>({
    requestId: "",
    userId: "",
    itemId: "",
    requesteddate: "",
    requestedtime: "",
    requestStatus: "",
  });
  useEffect(() => {
    if (selectedRow) {
      setRequest({ ...selectedRow })
    }
  }, [selectedRow])

  //add requestdata from form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setRequest({ ...request, [e.target.name]: e.target.value })
  }
  //handle update data 
  const handleSave = async () => {
    try {
      const updatedRequest = await updateRequests(request);
      handleUpdate(request)
      handleClose()
      Swal.fire({
        title: "Successfully Updated!",
        icon: "success",
        draggable: true
      });
    } catch (err) {
      console.error("Failed to update the request", err)
    }
  }
  const renderFloatingTable = (label: string, name: keyof Request, type = "text", readOnly = false) => (
    <FloatingLabel
      controlId="floatingInput"
      label={label}
      className="mb-3"
    >
      <Form.Control
        type={type}
        name={name}
        value={request[name]}
        onChange={handleOnChange}
        readOnly={readOnly}
      />
    </FloatingLabel>
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {renderFloatingTable("Request Id", "requestId", "text", true)}
          {renderFloatingTable("User Id", "userId", "text", true)}
          {renderFloatingTable("Item Id", "itemId", "text", true)}
          {renderFloatingTable("Requested Date", "requesteddate", "text", true)}
          {renderFloatingTable("Requested Time", "requestedtime", "text", true)}
          <FloatingLabel controlId="floating-itemRole" label="Request Role" className="mb-3">
            <Form.Select name="requestStatus" value={request.requestStatus} onChange={handleOnChange}>

              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>

            </Form.Select>
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

export default EditRequest;