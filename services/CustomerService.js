const customerModel = require("../models/CustomerModel.js"); 
const bcrypt = require("bcryptjs");

exports.createACustomer = async(req, res) =>{
    // validation happen before this func in validation.js refer to CustomerController.js
    const newCustomer = new customerModel(req.body); 
    try{
        const salt = await bcrypt.genSalt(10);
        newCustomer.password = await bcrypt.hash(newCustomer.password, salt);

        try{
            const savedCustomer = await newCustomer.save();
            res.status(201).json({
                message: `The customer was successfully created and stored in the Rest-Inn database.`,
                result: savedCustomer
            })
        }
        catch(error){
            res.status(500).json({
                message: error
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: `There was an error encrypting the password.`
        })
    }
};

exports.getACustomer = async(req, res) =>{
    // validation happen for right id format
    try{
        const customer = await customerModel.findById(req.params.id);
        if(customer){
            res.json({
                message: `Customer with id ${req.params.id}.`,
                result: customer
            })
        }
        else{
            res.status(404).json({
                message: `There are no customer with id ${req.params.id} in the Rest-Inn database.`
            })
        }
    }
    catch(err){
        if (err.name === "CastError" && err.kind === "ObjectId") {
            res.status(404).json({
                message: `There is no customer in our database with id ${req.params.id}`
            })
        }
        else {
            res.status(500).json({
                message: err
            })
        }
    }
};