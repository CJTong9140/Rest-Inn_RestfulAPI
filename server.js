const express = require("express"); 

if(process.env.NODE_ENV!=="production"){
    require("dotenv").config({path:"config/keys.env"}); 
}

const app = express(); 

app.listen(process.env.PORT, async()=>{
    console.log(`Web Server is up and running on PORT ${process.env.PORT}!`); 
})