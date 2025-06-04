import axios from "axios"
import { error } from "console";

const baseURL = "http://localhost:8085/lostfound/api/v1/requests"

const fetchToken = () => {
    const token = localStorage.getItem("lostfound");
    return "Bearer " + token;
}
const AddRequestData = async (request: any) => {
    //save a request
    console.log("save request.......", request)
    try {
        const response = await axios.post(
            baseURL, request,{
            headers: {
                Authorization: fetchToken()
            }
        }
        );
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Failed to update the data", error)
        throw error
    }
}

const DeleteRequests = async (requestId: string) => {

    try {
        const response = await axios.delete(
            `${baseURL}?requestId=${requestId}`,
            {
            headers: {
                Authorization: fetchToken()
            }
        }
        );
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Failed to delete the data", error)
        throw error
    }
}
const GetRequests = async () => {

    try {
        const response = await axios.get(`${baseURL}/getallrequests`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Failed to get the data", error)
        throw error
    }
}
const UpdateRequests = async (request: any) => {

    try {
        const response = await axios.patch(
            `${baseURL}?requestId=${request.requestId}`,
            request,
             {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Failed to update the data", error)
        throw error
    }
}
export { AddRequestData, DeleteRequests, GetRequests, UpdateRequests }
