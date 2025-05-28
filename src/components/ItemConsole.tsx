import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { GetItems } from '../service/Items/GetItems';
import { useEffect, useState } from 'react';
import EditItem from './EditItem';
import { DeleteItems } from '../service/Items/DeleteItems';
import AddItem from './AddItem';

export function ItemConsole() {

    //to load data making interface
    interface Item {
        id: string;
        name: string;
        description: string;
        date: string;       // You may convert this to Date if you're storing real date objects
        time: string;       // Consider using a time format or Date object if needed
        status: string; // strict type for status values
    }

    const [itemData, setItemData] = useState<Item[]>([]);
    const [selectedRow,setSelectedRow] =useState<Item|null>(null)
    const [showEditItemForm,setShowEditItemForm] = useState(false) //handle the show edit item form
        const [showAddItemForm,setShowAddItemForm] = useState(false) 


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
        setSelectedRow(row)
        setShowEditItemForm(true)
    }
    const handleClose=()=>setShowEditItemForm(false)
    
    const handleUpdate = (updateItem : Item)=>{
        console.log("Updated Item",updateItem)
    }
    //to delete data
    const handleDelete = async(id:string)=>{
        try{
            await DeleteItems(id)
        setItemData(itemData.filter((item)=>item.id !==id))
        }catch(err){
            console.error("Delete item failed with",err)
        }
        
    }
    const handleAdd=(newItem:Item)=>{
        setItemData((prevData)=>[...prevData,newItem])
    }
    return (
        <>
        <div className="d-flex justify-content-end p-3">
              <Button variant="outline-primary" onClick={()=>setShowAddItemForm(true)} >Add Item</Button>

        </div>

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
                                <Button variant="outline-danger" onClick={() =>handleDelete(row.id)}>Delete</Button>

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
            <AddItem
            show={showAddItemForm}
            handleClose={()=>setShowAddItemForm(false)}
            handleAdd={handleAdd}
            />
        </>
    )
}

