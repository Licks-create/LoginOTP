import express from "express"
import cors from "cors"
import morgan from "morgan"
import {connectDB} from "./database/conn.js"
import mongoose from "mongoose"
import router from "./router/route.js"
import { errorhandler } from "./middleware/errHandling.js"
import dotenv from 'dotenv' 
dotenv.config() 
import nodemailer from "nodemailer"
import Mailgen from "mailgen"


const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.disable('x-powered-by')
app.use(morgan('tiny')) 
  
connectDB() 




// api routes
app.post('/mail',async(req,res,next)=>{

    const {email}=req.body
    let config={
        service:'gmail',
        auth:{
            user:process.env.mail, 
            pass:process.env.pass 
        }
    }
    let transporter=nodemailer.createTransport(config)

    let mailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"vivekanand ojha",
            link:"https://x.com"
        }
    })
 
    let response={
        body:{
            name:"rahul",
            intro:"Your bill arrived",
            table:{
                data:[{
                    item:"Nodemailed stack book",
                    description:"A backend stack application",
                    price:"12$"
                }] 
            },
            outro:"lookiing forward"
        }
    }
    let mail=mailGenerator.generate(response)

    let message={
        from :process.env.mail,
        to:email,
        subject:"place order",
        html:mail
    } 



    try {

      let result=await  transporter.sendMail(message)
      console.log(result);     
      return res.json({message:"message sent"})   
    } catch (error) {
     next(new Error(error))   
    }
})
 

app.use('/api',router)





const port=8001;
// http get request 
app.get('/',(req,res,next)=>{
    res.status(201).json({message:"Home Get Request"})
    res.end()  
})
app.use(errorhandler) 

mongoose.connection.once('open',()=>{   
    app.listen(port,()=>console.log(`server running on port ${port}`))    
})

mongoose.connection.on("error",(err)=>{
    console.log("error in connection!!")
})
 