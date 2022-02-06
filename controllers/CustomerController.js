const express = require("express"); 
const customerService = require("../services/CustomerService.js");
const customerValidation = require("../middleware/validation.js"); 
const CustomerRouter = express.Router(); 

// Middleware that is specific to this router
// Allow a customer to register
CustomerRouter.post("/", customerValidation.createCustomerValidation, customerService.createACustomer); 

// Retrieve a specific customer by id
CustomerRouter.get("/:id", customerService.getACustomer);

module.exports = CustomerRouter; 