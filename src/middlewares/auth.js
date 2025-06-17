const adminAuth=(req,res,next)=>{
    // res.json("Hi")
    const isAuthorized=true;
    if (isAuthorized){
        next();
    }
    else{
        res.status(401).send("InvALID USER")
    }
}

module.exports={
adminAuth
}