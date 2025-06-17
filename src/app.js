const express=require ('express')
const app=express()
app.use(express.json())
const connectDB=require("./config/database") 
const User=require('./models/user')
const bcrypt = require('bcrypt')


app.post("/signup",async (req,res)=>{
    //auth middleware
    const {firstName, lastName, emailId,age,gender,password} = req.body;
    const passwordHash=await bcrypt.hash(password,10);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        age,
        gender

    });
    await user.save()
    res.send("User added")
})

app.post("/login",async(req,res)=>{ 
    try{
    const {emailId,password}=req.body;
    const isEmailExists=await User.findOne({emailId:emailId})

    if(!isEmailExists){
        throw new Error("User email not found");
    }
    const isPasswordMatch=await bcrypt.compare(password,isEmailExists.password);
    if(!isPasswordMatch){
        throw new Error("Invalid password");
    }
    else{res.send("Login successful");}
    
}catch(err){

    res.status(401).send(err.message);
}
})
app.get("/users",async (req,res)=>{
    const email=req.body.emailId;

    const users=await User.find({emailId:email});
    res.send(users);
})

connectDB()
.then(()=>{
    console.log("Database connected")
    app.listen(5000,()=>{
    console.log("Server up and running")
}) 
})
.catch(err=>{
    console.error("Database not connected")
})

