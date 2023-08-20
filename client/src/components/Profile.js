import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../Assets/profile.png";
import "../styles/username.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidate } from "../helper/validate";
import { useDispatch, useSelector } from "react-redux";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetchhook";
import { updateUser } from "../helper/helper";
import { logout } from "../app/apiSlice";

const Profile = () => {

  const dispatch=useDispatch()
  const token=useSelector(state=>state.user.token)
  const navigate=useNavigate()
  // const [file, setFile] = useState();
  // console.log(file);
  
  const username=useSelector(state=>state.user.data.username)
  const [{isLoading,apiData,serverError}]=useFetch(`user/${username}`)
  
  
  const formik = useFormik({
    initialValues: {
      firstName:'',
      lastName:'',
      email:"vivek@gmail.com",
      username: "example123",
      mobile:'',
      address:"" ,
      profile:""
    },
    // enableReinitialize:true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {



      const toastId=toast.loading("Updating...")
      try {
        localStorage.setItem("token",token)
        const data=await updateUser(values);

        // console.log(data,data?.data?.status)

        toast.dismiss(toastId)

        if(data?.data?.status===201){
          toast.success("Modified Sucessfully...")
        }
        

        
      } catch (error) {
        toast.dismiss(toastId)
        if(error?.error?.response?.status===404)
        toast.error(error?.error?.response?.data?.Error)
        else if(error?.error?.response){
          toast.error(error?.error?.response?.data?.message)
        }
        else
        toast.error(error?.error?.message)
        // console.log(error)
        
      }
      // console.log({values,token});
    },
  });

  const Logout=()=>{
    toast.success('logout successfully')
    dispatch(logout())
    setTimeout(() => {
      navigate('/')
    }, 1000);
  }
  
  // console.log(formik.values.profile);
  useEffect(()=>{

    // console.log(document.getElementsByTagName('img'));
    
    if(apiData){

      formik.setFieldValue('firstName',apiData?.data[0]?.firstName)
      formik.setFieldValue('lastName',apiData?.data[0]?.lastName)
      formik.setFieldValue('email',apiData?.data[0]?.email)
      formik.setFieldValue('username',apiData?.data[0]?.username)
      formik.setFieldValue('address',apiData?.data[0]?.address)
      formik.setFieldValue('profile',apiData?.data[0]?.profile)
      formik.setFieldValue('mobile',apiData?.data[0]?.mobile)
  
    // console.log({apiData});
    // console.log(apiData?.data[0]?.profile);
    
    
  }
  },[apiData])

  
  if(isLoading)return(
    <h1>Loading..</h1>
    )
 else if(serverError)return(     
    <>
      <h1>{serverError.message}</h1>
      <Link to={'/'}>Back to Login</Link>
    </>
    ) 
else{
  // console.log(formik.values,{apiData}) 
}


  function click() {
    // toast.success("no error");
  }
  const upload = async (e) => {
    // console.log(e.target.files);
    const base64 = await convertToBase64(e.target.files[0]);
    formik.setFieldValue('profile',base64)
  };



  return (
    <div className="container" >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="">
        <div className="fullBox" style={{width:"60%"}}>
          <div className="title">
            <h4 className="hello">Profile</h4>
            <span className="explore">You can update the details.</span>
          </div>

          <form
            action=""
            className="form"
            onSubmit={formik.handleSubmit}
            style={{ gridTemplateRows: "30% 60% 10%", height: "70vh" }}
          >
            <div className="img" style={{ width: "26.5%", height: "75%" }}>
              <label htmlFor="profile" style={{ cursor: "pointer" }}>
                <img src={formik.values.profile || avatar} id="img" alt="avatar" />
              </label>
              <input
                onChange={upload}
                type="file"
                name="profileDP"
                id="profile"
                style={{ display: "none" }}
                accept="image/png,image/jpeg"
              />
            </div>

            <div className="username" style={{ height: "90%" ,      width:"85%"}}>
              <div className="name flex">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="firstName*"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder="lastName*"
                />
              </div>

              <div className="mbilemail flex">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  placeholder="Mobile*"
                />
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  placeholder="Email*"
                />
              </div>

                <div className="address flex">
              <input
                {...formik.getFieldProps("address")}
                type="test"
                placeholder="Address*"
              />
              <button type="submit" className="button" onClick={click}>
                Update
              </button>
                </div>
              
            </div>

            <div className="register">
              <span>come back later?</span>
              <button type="button"  onClick={Logout}>
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
