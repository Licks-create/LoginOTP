// make api request
import axios from "axios"
import axois from "axios"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"


// base url
axois.defaults.baseURL=process.env.React_App_Server_Domain


export async function authenticate(username){
    try {
        const auth = await axois.post('/api/authenticate',{username})
        console.log({auth});
        
        return auth;
    } catch (error) {
        return Promise.reject(error)    
    }
}


// get user details

export async function getUser({username}){
    try {
        const {data}= await axois.get(`api/user/${username}`)
        console.log(data,data?.data[0]);
        
        return data?.data[0];
    } catch (error) {
        return {error:"password doesnt match"}
        
    }
}

// register user function

export async function registerUser(credentials){
    credentials.mobile=1234566;
    // console.log(credentials);
    
    try {
        const {data:{message},status}= await axois.post(`api/register`,credentials)
        let { username,email}=credentials
        console.log({status,message});
        
        if(status===201){
            await axios.post('/api/registerMail',{username,useremail:email,text:"Email from vivegam corporation limited",subject:"registration successfull"})
        }

        console.log({credentials});
        
        return {status,message}


    } catch (error) {
        return Promise.reject({error})
        
    }
}

// create login function

export async function verifyPassword({username,password}){
    try {
        if(username){
          const {data,status}=await axios.post('/api/login',{username,password})
          toast.success(data.message)
          return {data,status}
        }
    } catch (error) {
        console.log({error})

        if(error?.response)
        return Promise.reject(error?.response?.data?.message)
        else
        return Promise.reject(error?.message)
    }
}



// update user
export async function updateUser(response){
    try {
        const token= await localStorage.getItem('token')
        console.log({token});
        
        const data =await axois.put('/api/updateUser',response,{headers:{"authorization":`Bearer ${token}`}})
        return {data}
    } catch (error) {
        return Promise.reject({error})
    }
}

// generate OTP
export async function generateOTP(username){

    let toastId
    try {

        toastId=toast.loading("Otp being sent to your mail..") 
        const {data:{OTP},status}= await axios.get(`/api/generateOTP/?username=${username}`)
        
        
        //   send mail with otp
        if(status===201){
            let {email} = await getUser({username})
            let text=`Your password recovery otp is ${OTP}`
            console.log({email})


            await axios.post('/api/registerMail',{username,useremail:email,text,subject:"verify OTP"})
            toast.dismiss(toastId);
            toast.success("OTP sent to your mail")
        return OTP;
      }
    return {OTP:null}
      

    } catch (error) {
        toast.dismiss(toastId)
        
        return Promise.reject(error)
    }
}


// verify otp
export async function verifyOTP({username,otp}){
    try {
        console.log(otp,{username,otp})
       const {data,status}=await axios.get(`/api/verifyOTP?username=${username}&&otp=${otp}`)
       return {data,status};

    } catch (error) {
        return Promise.reject({error})
    }
}



// reset password
export async function resetPassword({username,password}){
    console.log({username,password});
    
    try {
        const {data,status}=await axois.put('/api/resetPassword',{username,newPassword:password})
        return {data,status}
    } catch (error) {
        return Promise.reject({error})
    }
}