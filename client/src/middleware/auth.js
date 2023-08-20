import { Navigate } from "react-router-dom";

export const AuthorizedUser=({children})=>{
    const token=localStorage.getItem('token');
    console.log(children);
    
    if(!token){
       return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}