import React ,{useState,useEffect}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import avatar from "../Assets/profile.png"
import "../styles/username.css"
import {Toaster,toast} from "react-hot-toast"
import {useFormik} from "formik"
import { usernameValidate } from '../helper/validate'
import {useDispatch,useSelector} from "react-redux"
import { setData } from '../app/apiSlice'


const Username = () => {

    const username=useSelector(state=>state.user.data.username)
    const dispatch = useDispatch();
    const navigate=useNavigate();
    // console.log(username)

    const formik=useFormik({
        initialValues:{
            username:''
        },
        validate:usernameValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
            // console.log("values",{values})
            dispatch(setData({username:formik.values.username}))
            navigate('/password')
        }
    })
    // console.log(formik.values.username);
    
    function dispatchData(){
        dispatch(setData({username:formik.values.username}))
    }
    function click()
    {
        // toast.error("no error")
    }
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

            <form action="" className="form" onSubmit={formik.handleSubmit}>

                <div className='img'>
                    <img  src={avatar} alt="avatar" />
                </div>


                <div className='username' style={{height:"80%",justifyContent:"space-between"}}>
                    <input {...formik.getFieldProps('username')} type="text" placeholder='Username' style={{height:"40%"}} />
                    <button style={{height:"40%"}} type='submit' 
                    // onClick={dispatchData}
                    >Let's Go</button>
                </div>


                <div className='register'>
                    <span>Not a member? </span>
                    <Link to="/register" className='text-red-500'>RegisterNow</Link> 
                </div>



            </form>

        </div>
    </div>
   </div>
  )
}

export default Username
