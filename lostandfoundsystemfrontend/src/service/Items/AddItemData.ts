import axios from "axios"
import { error } from "console";

const addURL = "http://localhost:8085/lostfound/api/v1/items"

export const AddItemData = async (item: any) => {
    //save a item
    try {
        const response = await axios.post(
            addURL, item
        );
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Failed to update the data", error)
        throw error
    }
}