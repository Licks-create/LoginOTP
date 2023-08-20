import toast from "react-hot-toast"
import { authenticate } from "./helper";


// validate login page username

export async function usernameValidate(value){
    const errors=usernameVerify({},value)
    
    const toastId=toast.loading("loging...")

    try {
        
        if(value.username){
            const user= await authenticate(value.username);
            console.log({user});
            
            
            if(user.status!==200){
                errors.exist=toast.error("user "+  value.username + " doesn't exist")
            }
        }
        toast.dismiss(toastId)
    } catch (error) {
        console.log({error});
        console.log(error?.message,error?.response);

        if(error?.response)
        toast.error(error?.response?.data?.message)
        else
        toast.error(error?.message)


        toast.dismiss(toastId)
        return {error}
    }
    return errors;
}


// validate login page username

export async function passwordValidate(value){
    const errors=passwordVerify({},value)
    console.log("value",errors);
    
    return errors;
}


// validate reset password
export async function resetPasswordValidate(value){
    let error=passwordVerify({},value)
    console.log(error.password,value);
    
    if(value.password!==value.Confirm_password){
        error=toast.error("Password not matched")
    }
    console.log(error.password,value.Confirm_password);
    return error
}

// validate register form
export async function registerValidate(value){
    let errors=usernameVerify({},value)
    passwordVerify(errors,value)
    emailVerify(errors,value)
    // console.log(errors);

    return errors//it should go empty if no error found or all verified
}

// validate profie page
export async function profileValidate(value){
    let errors=emailVerify({},value)
    // passwordVerify(errors,value)
    // console.log(errors);

    return errors//it should go empty if no error found or all verified
}

// ***********************************************

// validate password
function passwordVerify(err={},value)
{
    if(!value.password){
        err.password=toast.error("password required")
    }else if(value.password.includes(' ')){
        err.password=toast.error('invalid password')
    }else if(value.password.length<4){
        err.password=toast.error('password must be more than 4 charactors')
    }
    return err
}


// validate usrname
function usernameVerify(err={},value)
{
    if(!value.username)
    {
        err.username=toast.error("Username Required...!")
    }else if(value.username.includes(" "))
    err.username=toast.error("invalid username ")
    return err
}


function emailVerify(err={},value)
{
    if(!value.email)
    {
        err.email=toast.error("Email Required...!")
    }else if(value.email.includes(" "))
    err.email=toast.error("invalid email")

    return err
}