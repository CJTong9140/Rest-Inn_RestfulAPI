const propertyModel = require("../models/PropertyModel.js");

// Create a property and save in the database
exports.createAProperty = async (req, res) => {
    // Validation happen before this func in validation.js refer to PropertyController.js
    const newProperty = new propertyModel(req.body);
    try {
        const savedProperty = await newProperty.save();
        res.status(201).json({
            message: `The property was successfully created and stored in the Rest-Inn database.`,
            result: savedProperty
        })
    }
    catch (err) {
        res.status(500).json({
            message: err
        })
    }
};

// Retrieve all the properties in the database 
// Retrieve all the properties in the database that belong to a specified type with {{URL}}/properties?propertyType=...
// Retrieve all the properties in the database that belong to a particular location with {{URL}}/properties?location=...
// Retrieve all the properties in the database that marked as bestsellers as true with {{URL}}/properties?isBestseller=...
exports.getProperties = async (req, res) => {
    // If query string empty, retrieving all the properties in the database
    const queryString = {};

    if (req.query.propertyType) {
        queryString.propertyType = req.query.propertyType;
    }

    if (req.query.location) {
        queryString.location = req.query.location;
    }
   
    if(req.query.isBestseller === "true" || req.query.isBestseller === "false"){
        queryString.isBestseller = req.query.isBestseller;
    }
   
    const urlParams = new URLSearchParams(req.query);

    try {
        const properties = await propertyModel.find(queryString);
        
        if(urlParams.toString() !== "" && Object.keys(queryString).length === 0){
            res.status(404).json({
                message: `Cannot access properties based on your request. Please modify your query string again.`
            })
        }else{
            res.json({
                message: `A list of Properties: `,
                data: properties,
                totalProperies: properties.length
            });
        }

    }
    catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

// Retrieve all the properties types in the database
exports.getAllPropertiesTypes = async (req, res) => {
    try {
        const propertyTypes = await propertyModel.find({}, { propertyType: 1, _id: 0 }).distinct("propertyType");
        
        if(propertyTypes.length > 0) {   
            res.json({
                message: `The list of all property types: `,
                result: propertyTypes,
                totalPropertyTypes: propertyTypes.length
            });
        }      
        else{
            res.status(404).json({
                message: `There are no property type being stored in the Rest-Inn database.`
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err
        });
    }
};


// Retrieve a specific property by id
exports.getAProperty = async (req, res) => {
    // Validate the ID in validation.js
    try {
        const property = await propertyModel.findById(req.params.id);
        if (property) {
            res.json({
                message: `Property with ID ${req.params.id}.`,
                result: property
            })
        }
        else {
            res.status(404).json({
                message: `There are no property with id ${req.params.id} in the Rest-Inn database.`
            })
        }
    }
    catch (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
            res.status(404).json({
                message: `There is no property in our database with id ${req.params.id}.`
            })
        }
        else {
            res.status(500).json({
                message: err
            })
        }
    }
};

// Update a property by id
exports.updateAProperty = async (req, res) => {
    // Validate the ID in validation.js
    try {
        const newProperty = await propertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (newProperty) {
            res.json({
                message: `The property with id ${req.params.id} was updated.`,
                data: newProperty
            })
        }
        else {
            res.status(404).json({
                message: `There is no property in the Rest-Inn database with id ${req.params.id}.`
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err
        })
    }
};

// Delete a property by id
exports.deleteAProperty = async (req, res) => {
    try {
        const property = await propertyModel.findByIdAndRemove(req.params.id);
        if (property) {
            res.json({
                message: `The property with ID ${req.params.id} was deleted from database successfully.`
            })
        } else {
            res.status(404).json({
                message: `Property with ID ${req.params.id} was not found in the database`
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err
        })
    }
}



