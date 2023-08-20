import React,{ useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../Assets/profile.png"
import "../styles/username.css"
import {Toaster,toast} from "react-hot-toast"
import {useFormik} from "formik"
import { passwordValidate } from '../helper/validate'
import useFetch from "../hooks/fetchhook";
import { useDispatch, useSelector } from 'react-redux'
import { verifyPassword } from "../helper/helper";
import { setLogin, setToken } from "../app/apiSlice";

const Password = () => {
    const login=useSelector(state=>state.user.data.login)
    const username=useSelector(state=>state.user.data.username)
   
   const dataRedux=useSelector(state=>state.user)
    
   useEffect(()=>{
    if(login){
    setTimeout(()=>{
        navigate('/profile')
        dispatch(setLogin(false))
    },2000)
}    
   },[login])

   
    const dispatch=useDispatch()
    const navigate=useNavigate()

   
    const formik=useFormik({
        initialValues:{
            password:''
        },
        validate:passwordValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
            const toastId=toast.loading('verifying...')
            try {
                values=await Object.assign(values,{username})
                const {data,status}=await verifyPassword(values)
                // useDispatch
                // console.log({data});
                // console.log({dataRedux});
                // console.log(values)
                toast.dismiss(toastId)
                if(status===200){
                    // console.log(data.message);
                    dispatch(setToken(data.accessToken))
                    dispatch(setLogin(true))
                }
                
            } catch (error) {
                // console.log({error})
                toast.dismiss(toastId)
                toast.error(error)
            }
        }
    })

   
// console.log(formik.values);

    function click()
    {
        // toast.error("no error")
    }

    const [{isLoading,apiData,serverError}]=useFetch(`user/${username}`)
    if(isLoading){return(
     <h1>Loading..</h1>
     )}
 if(serverError){return(     
     <>
                 <h1>{serverError.message}</h1>
                 <Link to={'/'}>Back to Login</Link>
     </>
     )}
     const userData=apiData?.data[0]
  return (
   <div className="container">
        <Toaster position='top-center' reverseOrder={false}>
        </Toaster>
    <div className="flex justify-center items-center h-screen">
        <div className="fullBox">
            <div className="title">
                <h4 className='hello'>Hello {userData?.firstName||userData?.username}</h4>
                <span className='explore'>
                    Explore More by connecting with us
                </span>
            </div> 

            <form action="" className="form" onSubmit={formik.handleSubmit}>

                <div className='img'>
                    <img  src={userData?.profile ||avatar} alt="avatar" />
                </div>


                <div className='username'>
                    <input {...formik.getFieldProps('password')} type="password" placeholder='Password' />
                    <button type='submit' onClick={click}>Sign In</button>
                </div>


                <div className='register'>
                    <span>Forgot password?</span>
                    <Link to="/recovery" className='text-red-500'>Recover password</Link> 
                </div>



            </form>

        </div>
    </div>
   </div>
  )
}

export default Password
