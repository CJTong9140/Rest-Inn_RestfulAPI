const express = require("express"); 
const CustomerRouter = express.Router(); 

// Middleware that is specific to this router
// Allow a customer to register
CustomerRouter.post("/", (req, res)=>{}); 

// Retrieve a specific customer by id
CustomerRouter.get("/:id", (req, res)=>{});

module.exports = CustomerRouter; 