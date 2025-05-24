import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { GetItems } from '../service/Items/GetItems';
import { useEffect, useState } from 'react';
import EditItem, { Status } from './EditItem';

export function ItemConsole() {

    //to load data making interface
    interface Item {
        id: string;
        name: string;
        description: string;
        date: string;       // You may convert this to Date if you're storing real date objects
        time: string;       // Consider using a time format or Date object if needed
        status: Status; // strict type for status values
    }

    const [itemData, setItemData] = useState<Item[]>([]);
    const [selectedRow,SetSelectedRow] =useState<Item|null>(null)
    const [showEditItemForm,SetShowEditItemForm] = useState(false) //handle the show edit item form

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
    const handleEdit =(row :Item)=>{
        console.log("handle Edit",row)
        SetSelectedRow(row)
        SetShowEditItemForm(true)
    }
    const handleClose=()=>SetShowEditItemForm(false)
    
    const handleUpdate = (updateItem : Item)=>{
        alert("Update Item")
        console.log("Updated Item",updateItem)
    }
    //to get data
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tHeads.map((headings,index) => (
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
                                <Button variant="outline-success" onClick={() =>handleEdit(row)}>Edit</Button>
                                <Button variant="outline-danger">Delete</Button>

                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <EditItem 
            show = {showEditItemForm}
            selectedRow ={selectedRow}
            handleClose={handleClose}
            handleUpdate={handleUpdate}

            />
        </>
    )
}

// 02/15
// 9.58