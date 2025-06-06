const express=require ('express')
const app=express()

app.use("/",(req,res,next)=>{
    // res.json("Hi")
    console.log("Hello")
    next()
},(req,res,next)=>{
    res.json({wash:"wAsh"})
})


app.listen(5000,()=>{
    console.log("Server up and running")
}) 