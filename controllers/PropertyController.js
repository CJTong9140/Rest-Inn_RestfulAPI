const express = require("express"); 
const propertyService = require("../services/PropertyService.js");
const propertyValidation = require("../middleware/validation.js"); 
const propertyRouter = express.Router(); 

// Middleware that is specific to this router
// Create Property to database
propertyRouter.post("/properties", propertyValidation.createPropertyValidation, propertyService.createAProperty); 

// Get all properties in database
// Get all properties that belong to a specified property type in database. 
// Get all properties that belong to a particular location
// Get all properties in the database that marked as bestsellers as true
propertyRouter.get("/properties", propertyService.getProperties); 

// Get all properties types in database
propertyRouter.get("/propertyTypes", propertyService.getAllPropertiesTypes); 

// Get a specific property by id
propertyRouter.get("/properties/:id", propertyValidation.idValidation, propertyService.getAProperty); 

// Update a specific property by id
propertyRouter.put("/properties/:id", propertyValidation.idValidation, propertyService.updateAProperty); 

// Remove a specific property by id
propertyRouter.delete("/properties/:id", propertyValidation.idValidation, propertyService.deleteAProperty); 

module.exports = propertyRouter; 
