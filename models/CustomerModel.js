const mongoose = require("mongoose"); 
const {Schema} = mongoose;

// Define schema
const customerSchema = new Schema({
    firstName : {
        type : String, 
        required : true
    }, 
    lastName : {
        type : String, 
        required : true
    }, 
    email : {
        type : String, 
        required : true
    },
    password : {
        type : String, 
        required : true
    }, 
    phoneNumbers : [{
        type: String
    }]
}, {timestamps: true}); 

// Create a model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;