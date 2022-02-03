
exports.createACustomer = (req, res) =>{
    res.json({
        message : `This is a POST request`
    })
};

exports.getACustomer = (req, res) =>{
    res.json({
        message : `This is a GET request with id ${req.params.id}`
    })
};