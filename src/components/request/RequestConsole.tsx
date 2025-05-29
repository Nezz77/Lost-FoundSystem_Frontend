import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import EditRequest from './EditRequest';
import AddRequest from './AddRequest';
import { AddRequestData, UpdateRequests, GetRequests, DeleteRequests } from '../../service/RequestData';
export function RequestConsole() {

    //to load data making interface
    interface Request {
        requestId: string;
        userId: string;
        itemId: string;
        requesteddate: string;       // You may convert this to Date if you're storing real date objects
        requestedtime: string;       // Consider using a time format or Date object if needed
        status: string; // strict type for status values
    }

    const [requestData, setRequestData] = useState<Request[]>([]);
    const [selectedRow, setSelectedRow] = useState<Request | null>(null)
    const [showEditRequestForm, setShowEditRequestForm] = useState(false) //handle the show edit item form
    const [showAddRequestForm, setShowAddRequestForm] = useState(false)


    useEffect(() => {
        const loadData = async () => {
            const requestDetails = await GetRequests()
            console.log(requestDetails)
            setRequestData(requestDetails);
        };
        loadData();
    }, [])

    const tHeads: String[] = [
        "Request Id",
        "User Id",
        "Item Id",
        "Requested Date",
        "requestedtime",
        "Status",
        "Action"
    ];
    //handle edit function
    const handleEdit = (row: Request) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditRequestForm(true)
    }
    const handleClose = () => setShowEditRequestForm(false)

    const handleUpdate = async (updateRequest: Request) => {
        try {
            const updatedList = await GetRequests(); // Re-fetch latest user list
            setRequestData(updatedList);            // Update the table
        } catch (error) {
            console.error("Failed to refresh user list after update", error);
        }
    }
    //to delete data
    const handleDelete = async (requestId: string) => {
        try {
            await DeleteRequests(requestId)
            setRequestData(requestData.filter((request) => request.requestId !== requestId))
        } catch (err) {
            console.error("Delete request failed with", err)
        }

    }
    const handleAdd = async (newRequest: Request) => {
        try {
            await AddRequestData(newRequest); // Save item to backend
            const updatedList = await GetRequests(); // Re-fetch updated list from backend
            setRequestData(updatedList); // Update the table data
        } catch (error) {
            console.error("Failed to add request", error);
        }
    };
    return (
        <>
            <div className="d-flex justify-content-end p-3">
                <Button variant="outline-primary" onClick={() => setShowAddRequestForm(true)} >Add Request</Button>

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
                    {requestData.map((row) => (
                        <tr key={row.requestId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td>
                                <div className="d-flex gap-2">
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.requestId)}>Delete</Button>

                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <EditRequest
                show={showEditRequestForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateRequests={UpdateRequests}

            />
            <AddRequest
                show={showAddRequestForm}
                handleClose={() => setShowAddRequestForm(false)}
                handleAdd={handleAdd}
                addRequest={AddRequestData}
            />
        </>
    )
}

