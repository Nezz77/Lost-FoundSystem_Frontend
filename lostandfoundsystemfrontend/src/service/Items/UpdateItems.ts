import axios from "axios"
import { error } from "console";

const updateItemsURL = "http://localhost:8085/lostfound/api/v1/items"

export const UpdateItems = async(item:any) =>{

   try{
    const response = await axios.patch(
        `${updateItemsURL}?itemId=${item.id}`,
      item
    );
    console.log (response.data)
    return response.data;

   }catch(error){
    console.error("Failed to update the data",error)
    throw error
   }
}