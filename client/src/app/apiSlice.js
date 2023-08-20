import {createSlice} from "@reduxjs/toolkit"

const apiSlice=createSlice({
    name:"apiSlice",
    initialState:{data:{
        username:"",
        register:false,
        login:false
    },token:""},
    reducers:{
        setData:(state,action)=>{
            // console.log(action.payload);
            
            state.data.username=action.payload.username
            // console.log(state.data.username);
            
        },
        setToken:(state,action)=>{            
            state.token=action.payload            
        },
        setActivity:(state,action)=>{            
            state.data.register=action.payload            
        },
        setLogin:(state,action)=>{            
            state.data.login=action.payload            
        },
        logout:(state,action)=>{
            state.data={
                username:"",
                register:false,
                login:false
            };
            state.token="";
        }
    }
})

export const {setData,setToken,setActivity,setLogin,logout} =apiSlice.actions
export default apiSlice.reducer