import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import EditRequest from './EditRequest';
import AddRequest from './AddRequest';
import { AddRequestData, UpdateRequests, GetRequests, DeleteRequests } from '../../service/RequestData';
import { useLocation } from 'react-router';
import Swal from 'sweetalert2'
import { Card } from 'react-bootstrap';
import bgImage from '../../img/request.png';

export function RequestConsole() {

    //to load data making interface
    interface Request {
        requestId: string;
        userId: string;
        itemId: string;
        requesteddate: string;       // You may convert this to Date if you're storing real date objects
        requestedtime: string;       // Consider using a time format or Date object if needed
        requestStatus: string; // strict type for status values
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
        "requestStatus",
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
            Swal.fire({
                title: "Successfully Deleted!",
                icon: "success",
                draggable: true
            });
        } catch (err) {
            console.error("Delete request failed with", err)
        }

    }
    const handleAdd = async (newRequest: Request) => {
        try {
            await AddRequestData(newRequest); // Save item to backend
            const updatedList = await GetRequests(); // Re-fetch updated list from backend
            setRequestData(updatedList); // Update the table data
            Swal.fire({
                title: "Successfully Added!",
                icon: "success",
                draggable: true
            });
        } catch (error) {
            console.error("Failed to add request", error);
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
                    <Button variant="outline-light" onClick={() => setShowAddRequestForm(true)}>
                        Add Request
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
       
    </div>
    );
}

