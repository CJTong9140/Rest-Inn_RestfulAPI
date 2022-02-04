const express = require("express"); 
const mongoose = require("mongoose"); 
const customerController = require("./controllers/CustomerController.js"); 
const propertyController = require("./controllers/PropertyController.js"); 

if(process.env.NODE_ENV!=="production"){
    require("dotenv").config({path:"config/keys.env"}); 
}

const app = express(); 

app.use(express.json()); 
app.use("/customers", customerController); 
app.use("/", propertyController); 

app.listen(process.env.PORT, async()=>{
    console.log(`Web Server is up and running on PORT ${process.env.PORT}!`); 
    
    try{
        await mongoose.connect(process.env.MONGODB_QUERY_STRING); 
        console.log(`You are now connected to MongoDB`); 
    }
    catch(err){
        console.log(`Error: ${err}`);
    }
})