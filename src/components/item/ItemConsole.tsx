import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { use, useEffect, useState } from 'react';
import EditItem from './EditItem';
import AddItem from './AddItem';
import { AddItemData, UpdateItems, GetItems, DeleteItems } from '../../service/ItemData';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import bgImage from '../../img/item.png';
import { Card } from 'react-bootstrap';

export function ItemConsole() {

    //to load data making interface
    interface Item {
        id: string;
        name: string;
        description: string;
        date: string;       // You may convert this to Date if you're storing real date objects
        time: string;       // Consider using a time format or Date object if needed
        itemStatus: 'LOST' | 'FOUND' | 'CLAIMED' | ""; // strict type for status values
    }

    const [itemData, setItemData] = useState<Item[]>([]);
    const [selectedRow, setSelectedRow] = useState<Item | null>(null)
    const [showEditItemForm, setShowEditItemForm] = useState(false) //handle the show edit item form
    const [showAddItemForm, setShowAddItemForm] = useState(false)


    useEffect(() => {
        const loadData = async () => {
            const itemDetails = await GetItems()
            console.log(itemDetails)
            setItemData(itemDetails);
        };
        loadData();
    }, [])

    const tHeads: String[] = [
        "Item Id",
        "Item Name",
        "Item Description",
        "Date",
        "Time",
        "Status",
        "Action"
    ];
    //handle edit function
    const handleEdit = (row: Item) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditItemForm(true)
    }
    const handleClose = () => setShowEditItemForm(false)

    const handleUpdate = async (updateItem: Item) => {
        try {
            const updatedList = await GetItems(); // Re-fetch latest user list
            setItemData(updatedList);            // Update the table
        } catch (error) {
            console.error("Failed to refresh user list after update", error);
        }
    }
    //to delete data
    const handleDelete = async (id: string) => {
        try {
            await DeleteItems(id)
            setItemData(itemData.filter((item) => item.id !== id))
            Swal.fire({
                title: "Successfully Deleted!",
                icon: "success",
                draggable: true
            });
        } catch (err) {
            console.error("Delete item failed with", err)
        }

    }
    const handleAdd = (savedItem: Item) => {
        setItemData(prev => [...prev, savedItem]); // ✅ Just update table with the item returned by backend
    };
    // get location of current route
    const location = useLocation();
    const routename = location.pathname.split("/").filter(Boolean).pop() || "HOME";
    const formattedTitle = routename.charAt(0).toUpperCase() + routename.slice(1).replace(/-/g, ' '); // Format the title
    // const handleAdd = async (newItem: Item) => {
    //         try {
    //             await AddItemData(newItem); // Save item to backend
    //             const updatedList = await GetItems(); // Re-fetch updated list from backend
    //             setItemData(updatedList); // Update the table data
    //         } catch (error) {
    //             console.error("Failed to add item", error);
    //         }
    //     };
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
                    <Button variant="outline-light" onClick={() => setShowAddItemForm(true)}>
                        Add Item
                    </Button>
                </Card.Body>
            </Card>

            <Table striped bordered hover className="bg-white bg-opacity-75">
                <thead>
                    <tr>
                        {tHeads.map((headings, index) => (
                            <th key={index}>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {itemData.map((row) => (
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

            <EditItem
                show={showEditItemForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateItems={UpdateItems}
            />
            <AddItem
                show={showAddItemForm}
                handleClose={() => setShowAddItemForm(false)}
                handleAdd={handleAdd}
                addItem={AddItemData}
            />
        </div>
    );
}

