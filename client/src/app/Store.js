import {configureStore} from "@reduxjs/toolkit"
import apiSliceReducer from "./apiSlice"
import {apiRTK} from "./apiRTK"

export const store=configureStore({
    reducer:{
        user:apiSliceReducer,
        [apiRTK.reducerPath]:apiRTK.reducer
    },
    devTools:true,
    middleware:getDef=>getDef().concat(apiRTK.middleware)
})

