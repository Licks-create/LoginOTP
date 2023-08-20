
import React ,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import "../styles/username.css"
import { useSelector } from 'react-redux'
import {Toaster,toast} from "react-hot-toast"
import useFetch from '../hooks/fetchhook'
import { generateOTP, verifyOTP } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

const styleForm={gridTemplateRows:"20% 50% 5%"}
const styleFormUsername={display:"grid",gridTemplateRows:"10% auto",alignItems:"center",justifyContent:"center",justifyItems:"center"}
const styleFormUsernameButtons={height:"90%"}
const styleFormUsernameSpan={color:"rgb(63, 58, 58)"}

const Recovery = () => {

    
    
    
    const navigate=useNavigate()
    const username=useSelector(state=>state.user.data.username)
    const [{isLoading,apiData,serverError}]=useFetch(`user/${username}`)
    const [otp,setOtp]=useState()

    console.log(!username)
    const genOTP=async(user)=>{
        if(!user)
      return toast.error("invalid username")
        try {
            const data=await generateOTP(username)
            console.log(data)
        } catch (error) {
            if(error?.response)
            toast.error(error?.response?.data?.message)
            else
            toast.error(error?.message)
            console.log(error)
        }
        
    }
    useEffect(()=>{
        console.log("useeffect");
         
        if(Boolean(username)===true) 
        genOTP(username)
    },[username])



  async  function onSubmit(e)
    {
        e.preventDefault();
        const toastId=toast.loading("verifying...")
        try {
            
            const data=await verifyOTP({username,otp})
            
                toast.dismiss(toastId)

                if(data.status===201){
                toast.success(data.data.message)
                setTimeout(() => {
                return   navigate('/reset')
                }, 1000);
            }
            } catch (error) {                
                toast.dismiss(toastId)
                console.log(error);
                if(error?.error?.response)
                toast.error(error?.error?.response?.data?.message)
        }
    }



    // if(isLoading){
    //     return(
    //     <h1>Loading..</h1>
    //     )}
    if(serverError){
        return(     
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
                <h4 className='hello'>Recovery</h4>
                <span className='explore'>
                    Enter otp to recover the password
                </span>
            </div>

            <form action="" className="form"  style={styleForm} >

                <span></span>


                <div className='username' style={styleFormUsername}>
                    <span style={styleFormUsernameSpan}>Enter 6 digit otp sent to your mail</span>
                    <input type="text" placeholder='OTP ' onChange={(e)=>setOtp(e.target.value)} />
                    <button style={styleFormUsernameButtons} type='submit' onClick={onSubmit} >Recover</button>
                </div>


                <div className='register'>
                    <span>Did'nt get otp?</span>
                    <button className='text-red-500' type='button' onClick={()=>genOTP(username)}>Resent OTP</button> 
                </div>



            </form>

        </div>
    </div>
   </div>
  )
}

export default Recovery
