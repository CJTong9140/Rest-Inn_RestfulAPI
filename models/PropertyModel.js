const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Property Schema
const propertySchema = new Schema({
    propertyTitle : {
        type: String, 
        required: true
    }, 
    rentalPricePerNight : {
        type: Number, 
        required: true
    }, 
    propertyDesc : {
        type: String
    }, 
    propertyType : {
        type: String, 
        required: true
    }, 
    houseRules : [{
        type: String
    }], 
    amenities : [{
        type: String, 
        required: true
    }], 
    location : {
        type: String, 
        required: true
    }, 
    isBestseller : {
        type: Boolean, 
        required: true
    }, 
    propertyPhotoURL : {
        type: String
    }
}, {timestamps: true}); 

// Creating a Property Model
const Property = mongoose.model('Property', propertySchema); 

module.exports = Property; 

