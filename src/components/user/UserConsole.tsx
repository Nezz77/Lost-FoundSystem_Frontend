import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import EditUser from './EditUser';
import AddUser from './AddUser';
import { AddUserData, UpdateUsers, GetUsers, DeleteUsers } from '../../service/UserData';
import { useLocation } from 'react-router';
import Swal from 'sweetalert2';
import { Card } from 'react-bootstrap';
import bgImage from '../../img/user.png';
export function UserConsole() {

    //to load data making interface
    interface User {
        userid: string;
        firstName: string;
        lastName: string;
        email: string;       // Assuming this is the username/email
        password: string;
        role: 'ADMIN'| 'STAFF'| 'USER' |"";      // You may convert this to Date if you're storing real date objects
    }

    const [userData, setUserData] = useState<User[]>([]);
    const [selectedRow, setSelectedRow] = useState<User | null>(null)
    const [showEditUserForm, setShowEditUserForm] = useState(false) //handle the show edit item form
    const [showAddUserForm, setShowAddUserForm] = useState(false)


    useEffect(() => {
        const loadData = async () => {
            const userDetails = await GetUsers()
            console.log(userDetails)
            setUserData(userDetails);
        };
        loadData();
    }, [])

    const tHeads: String[] = [
        "User Id",
        "First Name",
        "Last Name",
        "Email",
        "User password",
        "Role",
        "Action"
    ];
    //handle edit function
    const handleEdit = (row: User) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditUserForm(true)
    }
    const handleClose = () => setShowEditUserForm(false)

    const handleUpdate = async (updatedUser: User) => {
        try {
            const updatedList = await GetUsers(); // Re-fetch latest user list
            setUserData(updatedList);
                     // Update the table
        } catch (error) {
            console.error("Failed to refresh user list after update", error);
        }
    };
    //to delete data
    const handleDelete = async (userid: string) => {
        try {
            await DeleteUsers(userid)
            setUserData(userData.filter((user) => user.userid !== userid))
            Swal.fire({
                            title: "Successfully Deleted!",
                            icon: "success",
                            draggable: true
                        });
        } catch (err) {
            console.error("Delete User failed with", err)
        }

    }
    const handleAdd = async (savedUser: User) => {
        try {
            setUserData(prev => [...prev, savedUser]); // ✅ Just update table with the item returned by backend
            console.log("User added successfully", savedUser);
        } catch (error) {
            console.error("Failed to add user", error);
        }
    };
    const location = useLocation();
    const routename = location.pathname.split("/").filter(Boolean).pop() || "HOME";
    const formattedTitle = routename.charAt(0).toUpperCase() + routename.slice(1).replace(/-/g, ' '); // Format the title
    return (
        
            <div
            className="min-vh-100 d-flex flex-column align-items-start"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backdropFilter: "blur(2px)",
                position: "relative",
                padding: "2rem",
            }}
        >
            <Card className="mb-4 bg-dark text-white shadow-sm w-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {/* Heading centered */}
                <Card.Body className="d-flex justify-content-center">
                    <h1 className="m-0">{formattedTitle}</h1>
                </Card.Body>

                {/* Button aligned right */}
                <Card.Body className="d-flex justify-content-end">
                    <Button variant="outline-light" onClick={() => setShowAddUserForm(true)}>
                        Add User
                    </Button>
                </Card.Body>
            </Card>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tHeads.map((headings, index) => (
                            <th key={index}>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {userData.map((row) => (
                        <tr key={row.userid}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td>
                                <div className="d-flex gap-2">
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.userid)}>Delete</Button>

                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <EditUser
                show={showEditUserForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateUsers={UpdateUsers}

            />
            <AddUser
                show={showAddUserForm}
                handleClose={() => setShowAddUserForm(false)}
                handleAdd={handleAdd}
                addUser={AddUserData}
            />
        </div>
    );
}

