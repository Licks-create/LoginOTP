import React, { useEffect, useRef, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import avatar from "../Assets/profile.png"
import "../styles/username.css"
import {Toaster,toast} from "react-hot-toast"
import {useFormik} from "formik"
import { registerValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../helper/helper'
import { useRegisterMutation } from '../app/apiRTK'
import { useSelector } from 'react-redux'
import useFetch from '../hooks/fetchhook'

const Register = () => {
    
    const [register ,{
        isLoading,
        isSuccess,
        isError,
        status,
    }]=useRegisterMutation()

    const activity= useSelector(state=>state.user.data.register)

    // console.log({
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     status,
    // });
    // console.log('check point');
    
    const navigate=useNavigate()
    const [file,setFile]=useState()
    const [error,seterror]=useState(false)
    const [disabled,setDisabled]=useState(true)
    const [errorMessage,seterrorMessage]=useState("")
    const [successMessage,setsuccessMessage]=useState("")
    useEffect(()=>{
        if(file)
        setDisabled(false)
        else
        setDisabled(true)
    },[file])
    // console.log(file);
 
    
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
            username:"",
        },
        validate:registerValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
            // console.log(values)
            const toastId = toast.loading('creating...');
            try {
                values=Object.assign(values,{profile:file})
                // console.log(values);                

                // axios method
                // const registerUsr=await registerUser(values)
                // const {status,message}=await registerUser(values)
            // if(status===201){
            //     toast.success(message)
            //     setTimeout(() => {
            //         navigate('/')
            //     }, 2000);
            // }
            // seterror(false)


            // rtk query method            
            const rtk=await register(values)
            const {data,error}=rtk
            // console.log({data:data?.message,error:error?.data?.message});
            toast.dismiss(toastId)

            if(data?.message){
            setsuccessMessage(data?.message)            
        }
            else
            seterrorMessage(error?.data?.message)



        } catch (error) {

            // Less useful in case of rtk query
            // console.log(error);
            seterror(true)
            toast.dismiss(toastId)
            toast.error(error.error?.response?.data.message||error.error.message)                
            }
            
        }
    })

    useEffect(()=>{
        console.log({isSuccess,isError,successMessage,errorMessage});
        
        if (isSuccess) {
            toast.success(successMessage)
                  setTimeout(() => {
                           navigate('/')
                       }, 2000);
           }
           else if (isError) { 
               toast.error(errorMessage)
           }
       },[activity])




    const profile=useRef()
 
    const upload=async e=>{
        setDisabled(true)
        // console.log(e.target?.files[0]);
        // // console.log("e.target.files[0]",e.target.files[0]?.size/(1024*1024));

        const size=Number(e.target.files[0]?.size)/(1024*1024)

        if(size>.05){
            return toast.error(`size is ${size.toFixed(2)}MB (it must be less than 50kb)`)
        }
        if(e.target?.files[0]){
        const base64=await convertToBase64(e.target?.files[0])
        formik.values.profile=file;
        console.log((base64.length));        
        setFile(base64)
    }
    }
   


  return (
   <div className="container">
        <Toaster position='top-center' reverseOrder={false}>
        </Toaster>
    <div className="flex justify-center items-center h-screen">
        <div className="fullBox">
            <div className="title">
                <h4 className='hello'>Register</h4>
                <span className='explore'>
                    Happy to join you!
                </span>
            </div>

            <form action="" className="form" onSubmit={formik.handleSubmit} style={{gridTemplateRows:"30% 55% 10%",height:"70vh"}}>

                <div className='img' style={{width:" 38%"
    ,height: "95%" }}>
                    <label htmlFor="profile" style={{cursor:"pointer"}}>
                    <img style={{margin:"0rem auto"}} src={file||avatar} id="img" alt="avatar" />
                    </label>
                    <input onChange={upload} ref={profile} type="file" name="profileDP" id="profile" style={{display:"none"}} accept='image/png,image/jpeg' />
                </div>


                <div className='username register' style={{height:"90%"}}>

                    <div className="input">
                    <input {...formik.getFieldProps('email')} type="email" placeholder='Email*' />
                    <input {...formik.getFieldProps('username')} type="text" placeholder='Username*' />
                    <input {...formik.getFieldProps('password')} type="password" placeholder='Password*' />
                    </div>
                    <button disabled={disabled} style={{cursor:disabled?"not-allowed":"pointer"}}  type='submit' >Register</button>
                </div>


                <div className='register'>
                    <span>Already register?</span>
                    <Link to="/" className='text-red-500'>Login</Link> 
                </div>



            </form>

        </div>
    </div>
   </div>
  )
}

export default Register
