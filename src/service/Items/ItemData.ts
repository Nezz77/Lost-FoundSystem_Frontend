import axios from "axios"
import { error } from "console";

const baseURL = "http://localhost:8085/lostfound/api/v1/items"

const AddItemData = async (item: any) => {
    //save a item
    console.log("save item.......", item)
    try {
        const response = await axios.post(
            baseURL, item
        );
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Failed to update the data", error)
        throw error
    }
}

const DeleteItems = async (id: string) => {

    try {
        const response = await axios.delete(
            `${baseURL}?itemId=${id}`
        );
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Failed to delete the data", error)
        throw error
    }
}
const GetItems = async () => {

    try {
        const response = await axios.get(`${baseURL}/getallitems`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Failed to get the data", error)
        throw error
    }
}
const UpdateItems = async (item: any) => {

    try {
        const response = await axios.patch(
            `${baseURL}?itemId=${item.id}`,
            item
        );
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Failed to update the data", error)
        throw error
    }
}
export { AddItemData, DeleteItems, GetItems, UpdateItems }
