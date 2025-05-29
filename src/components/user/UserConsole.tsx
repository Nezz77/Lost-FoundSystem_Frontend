import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import EditUser from './EditUser';
import AddUser from './AddUser';
import { AddUserData, UpdateUsers, GetUsers, DeleteUsers } from '../../service/UserData';
export function UserConsole() {

    //to load data making interface
    interface User {
        id: string;
        username: string;
        password: string;
        role: string;       // You may convert this to Date if you're storing real date objects
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
        "User Name",
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
    const handleDelete = async (id: string) => {
        try {
            await DeleteUsers(id)
            setUserData(userData.filter((user) => user.id !== id))
        } catch (err) {
            console.error("Delete User failed with", err)
        }

    }
    const handleAdd = async (newUser: User) => {
  try {
    const savedUser = await AddUserData(newUser); // Save to backend
    setUserData(prev => [...prev, savedUser]);    // ✅ Update table immediately
  } catch (error) {
    console.error("Failed to add user", error);
  }
};
    return (
        <>
            <div className="d-flex justify-content-end p-3">
                <Button variant="outline-primary" onClick={() => setShowAddUserForm(true)} >Add User</Button>

            </div>

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
                        <tr key={row.id}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td>
                                <div className="d-flex gap-2">
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.id)}>Delete</Button>

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

