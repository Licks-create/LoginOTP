import axios from "axios";
import React,{ useEffect, useState } from "react";
axios.defaults.baseURL=process.env.React_App_Server_Domain

export default function useFetch(query){
    
  const [getData,setData]=useState({isLoading:false,apiData:null,status:undefined,serverError:null})
  // console.log("quey",query);

  useEffect(()=>{
    if(!query) return;

    
    const fetchData=async()=>{
        try {
            setData(pre=>({...pre,isLoading:true}))
            const {data,status}=await axios.get(`/api/${query}`)
            // console.log({data,status});
          
            if(status===201){
            setData(pre=>({...pre,isLoading:false,apiData:data,status}))
            // setData(pre=>({...pre,apiData:data,status}))
        }
        else
        setData(pre=>({...pre,isLoading:false}))
        } catch (error) {
          //  console.log("error",error.message);
           
            setData(pre=>({...pre,isLoading:false,serverError:error||error?.message}))
        }
    }

    fetchData()
  },[query])


  
  return [getData,setData]

}