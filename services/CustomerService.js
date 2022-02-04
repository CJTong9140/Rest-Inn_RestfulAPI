const customerModel = require("../models/CustomerModel.js"); 
const bcrypt = require("bcryptjs");

exports.createACustomer = async(req, res) =>{
    const newCustomer = new customerModel(req.body); 
    try{
        const salt = await bcrypt.genSalt(10);
        newCustomer.password = await bcrypt.hash(newCustomer.password, salt);

        try{
            const savedCustomer = await newCustomer.save();
            res.status(201).json({
                message: `The customer was successfully created and stored in the Rest-Inn database`,
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
            message: `There was an error encrypting the password`
        })
    }
};

exports.getACustomer = (req, res) =>{
    res.json({
        message : `This is a GET request with id ${req.params.id}`
    })
};