import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import EditUser from './EditUser';
import AddUser from './AddUser';
import { AddUserData, UpdateUsers, GetUsers, DeleteUsers } from '../../service/UserData';
import { useLocation } from 'react-router';
export function UserConsole() {

    //to load data making interface
    interface User {
        Userid: string;
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
            setUserData(updatedList);            // Update the table
        } catch (error) {
            console.error("Failed to refresh user list after update", error);
        }
    };
    //to delete data
    const handleDelete = async (Userid: string) => {
        try {
            await DeleteUsers(Userid)
            setUserData(userData.filter((user) => user.Userid !== Userid))
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
        <>
            <div className="d-flex justify-content-end p-3">
                <Button variant="outline-primary" onClick={() => setShowAddUserForm(true)} >Add User</Button>

            </div>
            <h1 className="text-center">{formattedTitle}</h1>
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
                        <tr key={row.Userid}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td>
                                <div className="d-flex gap-2">
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.Userid)}>Delete</Button>

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
        </>
    )
}

