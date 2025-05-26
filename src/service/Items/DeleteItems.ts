import axios from "axios"
import { error } from "console";

const deleteItemsURL = "http://localhost:8085/lostfound/api/v1/items"

export const DeleteItems = async(id:string) =>{

   try{
    const response = await axios.delete(
        `${deleteItemsURL}?itemId=${id}`
    );
    console.log (response.data)
    return response.data;

   }catch(error){
    console.error("Failed to delete the data",error)
    throw error
   }
}