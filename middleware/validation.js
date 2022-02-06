const ObjectId = require("mongoose").Types.ObjectId; 

// Validation for the user registration
exports.createCustomerValidation = (req, res, next) =>{
    const errors = []; 
    if(!req.body.firstName || req.body.firstName === ""){
        errors.push({
            field: "firstName", 
            message: `Required. Please provide your first name.`
        })
    }
    else{
        const firstNameFormat = /^[a-z A-Z]+$/;
        if(!firstNameFormat.test(req.body.firstName)){
            console.log("First name tested");
            errors.push({
                field: "firstName", 
                message: `Please enter a valid first name.`
            })
        }
    }

    if(!req.body.lastName || req.body.lastName === ""){
        errors.push({
            field: "lastName", 
            message: `Required. Please provide your last name.`
        })
    }
    else{
        const lastNameFormat = /^[a-z A-Z]+$/;
        if(!lastNameFormat.test(req.body.lastName)){
            console.log("Last name tested");
            errors.push({
                field: "lastName", 
                message: `Please enter a valid last name.`
            })
        }
    }

    if(!req.body.email || req.body.email === ""){
        errors.push({
            field: "email", 
            message: `Required. Please provide an email address.`
        })
    }
    else{
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailFormat.test(req.body.email)){
            console.log("Email tested");
            errors.push({
                field: "email", 
                message: `Please enter a valid email.`
            })
        }
    }

    if(!req.body.password || req.body.password === ""){
        errors.push({
            field: "password", 
            message: `Required. Please enter a password.`
        })
    }
    
    if(req.body.phoneNumbers.length > 0){
        const phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        for(let i = 0; i < req.body.phoneNumbers.length; i++){
            if(!phoneFormat.test(req.body.phoneNumbers[i])){
                errors.push({
                    field: "phoneNumbers", 
                    message: `Please enter a valid phone number.`
                });
                console.log("phone number tested");
                break; 
            }
        }
    }
    
    if(errors.length > 0){
        res.status(400).json({
            message: `Creating a new user was unsuccessful.`, 
            data: errors
        })
    }
    else{
        next(); 
    }
};

// Validation for user retrieval with ID


// 