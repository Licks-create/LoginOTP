import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../Assets/profile.png"
import "../styles/username.css"
import {Toaster,toast} from "react-hot-toast"
import {useFormik} from "formik"
import { resetPasswordValidate } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import { useSelector } from 'react-redux'
import useFetch from '../hooks/fetchhook'

const Reset = () => {
    const username=useSelector(state=>state.user.data.username)
    const [{isLoading,apiData,serverError}]=useFetch(`user/${username}`)
 
    const navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            password:'',
            Confirm_password:''
        },
        validate:resetPasswordValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
            const toastId=toast.loading('reseting password..')
            try {
                const data=await resetPassword({password:values.password,username})
                // console.log(data)

                toast.dismiss(toastId)
                if(data.status===200){
                    toast.success(data.data.message)
                    setTimeout(() => {
                        navigate('/password')
                    }, 2000);
                }
            } catch (error) {
                toast.dismiss(toastId)
                // console.log(error,error?.error?.message)
                if(error?.error?.response)
                toast.error(error?.error?.response?.data?.message)
                else
                 toast.error(error?.error?.message)
                
            }
            // console.log(values)
        }
    })


    function click()
    {
        // toast.error("no error")
    }

    if(isLoading){return(
        <h1>Loading..</h1>
        )}
    if(serverError){return(     
        <>
                    <h1>{serverError.message}</h1>
                    <Link to={'/'}>Back to Login</Link>
        </>
        )}
  return (
   <div className="container">
        <Toaster position='top-center' reverseOrder={false}>
        </Toaster>
    <div className="flex justify-center items-center h-screen">
        <div className="fullBox">
            <div className="title">
                <h4 className='hello'>Hello again!</h4>
                <span className='explore'>
                    Explore More by connecting with us
                </span>
            </div>

            <form action="" className="form" onSubmit={formik.handleSubmit} style={{gridTemplateRows:"60% auto"}}>

               

                <div className='username' style={{height:"80%"}}>
                    <input {...formik.getFieldProps('password')} type="password" placeholder='New Password' />
                    <input {...formik.getFieldProps('Confirm_password')} type="password" placeholder='Confirm Password' />
                    <button type='submit' onClick={click}>Reset Password</button>
                </div>


                <div className='register'>
                    <span>Forgot password?</span>
                    <Link to="/recovery" className='text-red-500'>Change password</Link> 
                </div>



            </form>

        </div>
    </div>
   </div>
  )
}

export default Reset
