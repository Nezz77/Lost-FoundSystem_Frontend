import { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


interface User {
        userid: string;
        firstName: string;
        lastName: string;
        email: string;       // Assuming this is the username/email
        password: string;
        role: 'ADMIN'| 'STAFF'| 'USER' |"";
    }

// interface User EditProps {
//   show: boolean;
//   selectedRow: User | null;
//   handleClose: () => void;
//   handleUpdate: (updateUser: User) => void;
// }


function AddUser({ show, handleClose, handleAdd, addUser }: any) {
  //state management
  const [newUser, setNewUser] = useState<User>({
    userid: "",
    firstName: "",
    lastName: "", 
    email: "", 
    password: "",
    role: "",
  });
  


  //add Userdata from form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }
  //handle add User data 
  const handleOnSubmit = async () => {
    if (!newUser.email || !newUser.password || !newUser.role) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const newUserDetails = await addUser(newUser);
      handleAdd(newUserDetails)
      handleClose()
      alert("Updated")
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
        value={newUser[name]}
        onChange={handleOnChange}
      />
    </FloatingLabel>
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {/* {renderFloatingTable("User Id", "id", "text", true)} */}
          {renderFloatingTable("First Name", "firstName")}
          {renderFloatingTable("Last Name", "lastName")}
          {renderFloatingTable("Email","email")}
          {renderFloatingTable("User Password", "password")}
          {renderFloatingTable("Role", "role")}
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

export default AddUser;