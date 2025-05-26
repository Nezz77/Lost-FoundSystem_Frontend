import axios from "axios"
import { error } from "console";

const getItemsURL = "http://localhost:8085/lostfound/api/v1/items/getallitems"

export const GetItems = async() =>{

   try{
    const response = await axios.get(getItemsURL);
    console.log (response.data)
    return response.data;
   }catch(error){
    console.error("Failed to get the data",error)
    throw error
   }
}