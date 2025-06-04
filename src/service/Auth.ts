import axios from "axios";
const baseAuthUrl = "http://localhost:8085/lostfound/api/v1/auth";

const SignUpReq = async(signUp :any) =>{
    console.log(signUp)
    try{
      const signUpResponse = await axios.post(
           `${baseAuthUrl}/signup`,
            signUp
       );
       return signUpResponse.data.token
    }catch(err){
        console.error(err)
        throw err;

    }
     
}
const SignInReq = async(signIn :any) =>{
    console.log(signIn)
    try{
        const signInResponse = await axios.post(
            `${baseAuthUrl}/signin`,
            signIn
        );
        return signInResponse.data.token

    }catch(err){
        console.error(err)
        throw err
    }
   
}

export { SignUpReq, SignInReq}