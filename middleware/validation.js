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
        if(!firstNameFormat.test(req.body.firstName) || req.body.firstName.trim().length === 0){
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
        if(!lastNameFormat.test(req.body.lastName) || req.body.lastName.trim().length === 0){
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
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,2}[a-zA-Z]{2,}))$/;
        if(!emailFormat.test(req.body.email)){
            console.log("Email tested");
            errors.push({
                field: "email", 
                message: `Please enter a valid email.`
            })
        }
    }

    if(!req.body.password || req.body.password === "" || req.body.password.trim().length === 0){
        errors.push({
            field: "password", 
            message: `Required. Please enter a password.`
        })
    }
    
    if(req.body.phoneNumbers){
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

// Validation for the property creation
exports.createPropertyValidation = (req, res, next) =>{
    const errors = [];
    if(!req.body.propertyTitle || req.body.propertyTitle === ""){
        errors.push({
            field: "propertyTitle",
            message: `Required. Please provide the property title.`
        })
    }
    else{
        const propertyTitleFormat = /^[a-zA-Z0-9 ,]*$/;
        if(!propertyTitleFormat.test(req.body.propertyTitleFormat) || req.body.propertyTitle.trim().length === 0){
            errors.push({
                field: "propertyTitle", 
                message: `Please enter a valid property title.`
            })
        }
    }

    if(!req.body.rentalPricePerNight || req.body.rentalPricePerNight === ""){
        errors.push({
            field: "rentalPricePerNight",
            message: `Required. Please provide the property rental price (per night).`
        })
    }
    else{
        const rentalPriceFormat = /^\d*\.?\d+$/; 
        if(!rentalPriceFormat.test(req.body.rentalPricePerNight)){
            errors.push({
                field: "rentalPricePerNight", 
                message: `Please enter a valid property rental price (per night).`
            })
        }
    }

    if(!req.body.propertyType || req.body.propertyType === ""){
        errors.push({
            field: "propertyType",
            message: `Required, please provide the property type.`
        })
    }
    else{
        const propertyTypeFormat = /^[a-z A-Z]+$/;
        if(!propertyTypeFormat.test(req.body.propertyType) || req.body.propertyType.trim().length === 0){
            errors.push({
                field: "propertyType", 
                message: `Please enter a valid property type.`
            })
        }
    }

    if(req.body.houseRules){
        const ruleFormat = /^[a-zA-Z0-9 ,]*$/;
        for(let i = 0; i < req.body.houseRules.length; i++){
            if(!ruleFormat.test(req.body.houseRules[i]) || req.body.houseRules[i].trim().length === 0){
                errors.push({
                    field: "houseRules", 
                    message: `Please enter valid house rules.`
                });
                break; 
            }
        }
    }

    if(!req.body.amenities || req.body.amenities.length < 1){
        errors.push({
            field: "amenities", 
            message: `Required. Please provide one or more amenities of the property.`
        })
    }
    else{
        const amenityFormat = /^[a-z A-Z]+$/;
        for(let i = 0; i < req.body.amenities.length; i++){
            if(!amenityFormat.test(req.body.amenities[i]) || req.body.amenities[i].trim().length === 0){
                errors.push({
                    field: "amenities", 
                    message: `Please enter the valid amenities of the property.`
                });
                break; 
            }
        }
    }

    if(!req.body.location || req.body.location === ""){
        errors.push({
            field: "location",
            message: `Required. Please provide the location of the property.`
        })
    }
    else{
        const locationFormat = /^[a-zA-Z0-9 ,]*$/; 
        if(!locationFormat.test(req.body.location) || req.body.location.trim().length === 0){
            errors.push({
                field: "location", 
                message: `Please enter the valid location of the property.`
            })
        }
    }
    
    if(!req.body.isBestseller || req.body.isBestseller === ""){
        errors.push({
            field: "isBestseller",
            message: `Required. Please indicate if the property is the bestseller property. Answer in true or false.`
        })
    }
    else{
        if(toString(req.body.isBestseller) !== "true" && toString(req.body.isBestseller) !== "false" && toString.call(req.body.isBestseller) !== '[object Boolean]'){
            console.log("testing");
            errors.push({
                field: "isBestseller",
                message: `Please enter true or false to indicate if the property is the bestseller.`
            })
        }
    }

    if(req.body.propertyPhotoURL){
        const urlFormat = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if(!urlFormat.test(req.body.propertyPhotoURL)){
            errors.push({
                field: "propertyPhotoURL", 
                message: `Please enter the valid URL for the of the property.`
            })
        }
    }

    if(errors.length > 0){
        res.status(400).json({
            message: `Creating a new property was unsuccessful.`, 
            data: errors
        })
    }
    else{
        next(); 
    }
}

