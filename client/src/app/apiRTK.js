import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import axios from "axios"
import { setActivity } from "./apiSlice"
import { toast } from "react-hot-toast"
// import axios from "axios"

// base url
axios.defaults.baseURL=process.env.React_App_Server_Domain


export const apiRTK=createApi({
    reducerPath:"apiRTK",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8001"
    }),
    tagTypes: ['User'],
    endpoints:builder=>({
        register:builder.mutation({
            query:(credentials)=>{
                credentials.mobile=123456;
                // console.log({credentials});
                
                return {
                    url:'/api/register',
                    method:"POST",
                    body:credentials
                }
            },
            invalidatesTags:[{type:'User',id:"Register"}],

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                // A function that is called when you start each individual query or mutation
                try {
                    const { data,meta ,error} = await queryFulfilled
                    // console.log({data,meta,error},data?.Error)
                    // console.log(meta?.response?.status);

                    if(data?.Error)
                    return toast.error(data?.Error)

                    if(meta?.response?.status===201){
                                const toastId = toast.loading('email being sent...');

                        const emailData={username:data.addedUser.username,useremail:data.addedUser.email,text:"Email from vivegam corporation limited ",subject:"RTK registration successfull"}

                        await axios.post('/api/registerMail',emailData)

                        toast.dismiss(toastId)

                        dispatch(setActivity(true))

                    }


                    // dispatch(logOut())
                    // setTimeout(() => {
                    //     dispatch(apiSlice.util.resetApiState())
                    // }, 1000);//to delay is to ensure all subscriptions are removed

                    // resetApistate does clear cache completely and every subscriptions
                } catch (err) {
                    console.log({err})
                    console.log(err?.error?.data?.message);
                    
                    toast.error(err?.error?.error||err?.error?.data?.message)
                }
            }
        }),




    })
})



export const {
        useRegisterMutation
    } =apiRTK 
