import { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


interface User {
  userid: string;
  firstName: string;
  lastName: string;
  email: string;       // Assuming this is the username/email
  password: string;
  role: 'ADMIN' | 'STAFF' | 'USER' | "";
}

interface UserEditProps {
  show: boolean;
  selectedRow: User | null;
  handleClose: () => void;
  handleUpdate: (updatedItem: User) => void;
  updateUsers: (user: User) => Promise<User>;
}


function EditUser({ show, selectedRow, handleClose, handleUpdate, updateUsers }: UserEditProps) {
  //state management
  const [user, setUser] = useState<User>({
    userid: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  useEffect(() => {
    if (selectedRow) {
      setUser({ ...selectedRow })
    }
  }, [selectedRow])

  //add Userdata from form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  //handle update data 
  const handleSave = async () => {
    try {
      const updatedUser = await updateUsers(user);
      handleUpdate(user)
      handleClose()
      alert("Updted")
    } catch (err) {
      console.error("Failed to update the User", err)
    }
  }
  const renderFloatingTable = (label: string, name: keyof User, type = "text", readOnly = false) => (
    <FloatingLabel
      controlId="floatingInput"
      label={label}
      className="mb-3"
    >
      <Form.Control
        type={type}
        name={name}
        value={user[name] ?? ""}
        onChange={handleOnChange}
        readOnly={readOnly}
      />
    </FloatingLabel>
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {renderFloatingTable("User Id", "userid", "text", true)}
          {renderFloatingTable("First Name", "firstName")}
          {renderFloatingTable("Last Name", "lastName")}
          {renderFloatingTable("UserName/Email", "email", "email", true)}
          {renderFloatingTable("User password", "password")}
          {renderFloatingTable("Role", "role")}
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

export default EditUser;