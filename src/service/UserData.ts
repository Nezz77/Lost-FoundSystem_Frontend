import axios from "axios"

const baseURL = "http://localhost:8085/lostfound/api/v1/users"

const fetchToken = () => {
    const token = localStorage.getItem("lostfound");
    return "Bearer " + token;
}
const AddUserData = async (user: any) => {
    //save a User
    console.log("save user.......", user)
    try {
        const response = await axios.post(
            baseURL, user
            , {
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

const DeleteUsers = async (userid: string) => {

    try {
        const response = await axios.delete(
            `${baseURL}?userId=${userid}`,
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
const GetUsers = async () => {

    try {
        const response = await axios.get(`${baseURL}/getallusers`
            ,
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
const UpdateUsers = async (user: any) => {

    try {
        const response = await axios.patch(
            `${baseURL}?userId=${user.userid}`,
            user,
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
export { AddUserData, DeleteUsers, GetUsers, UpdateUsers }
