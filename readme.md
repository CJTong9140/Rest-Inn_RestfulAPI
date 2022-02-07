# Rest-Inn RESTful API

I have created a simple RESTful API for a short-term rental company. This application is able to handle all 
incoming HTTP requestS and return HTTP responses in JSON format, by using HTTP methods (GET, PUT, DELETE, POST).
The travel rental booking web application is able to allow users/administrators to create, retrieve, update, and delete certain data records. 

# ***Customer***

## End Points
### POST /customers
Above endpoint allows a customer to register. You are required to send valid customer information in JSON format as the body of the request. The data fields for user creation includes: 

- firstName: 
    - Required
    - Data type: String
- lastName: 
    - Required
    - Data type: String
- email: 
    - Required 
    - Data type: String
- password: 
    - Required
    - Data type: String
    - The password has been encrypted with Bcrypt before being stored inside of the database. 
- phoneNumbers: 
    - Optional
    - Data type: Array of String

### GET /customers/:id
Based on the id that is provided in route parameter, above endpoint able to retrieve a specific customer's information if the id exists inside of the databse. 

## Validation
### User Registration
When creating a new customer to the database, all fields need to be entered with valid information. All required 
fields are mandatory and cannot be empty (OR only contain spaces). 
- **First name** field only allow alphabetical string. By considering the possibilities of two worded first names (E.g. Mary Jane), space is also allowed in this field. 
- **Last name** field only allow alphabetical string. By considering the possibilities of hyphenated last name, (Combined last names of two spouses), '-' is also allowed in this field. 
- **Email** field has been validated with regex. Only valid email format can be stored in database. 
- **Password** field cannot only accept space or left empty. 
- **Phone Numbers** field stores an array of phone numbers for the user. Each phone numbers will be validated before storage based on North American phone number formats. Except digits, the field can also allow - . ( ) or single space between sets of numbers. 

### User Retrieval
When retrieving a specific customer information by id, req.params.id also contain validation logic before retrieval. The IDs are being generated automatically by MongoDB, it contains 12-byte ObjectId value, which is a 24 characters string. Anything that is not 24 characters will be determined as invalid. All ids contain numbers and alphabets, any special characters is not allowed to include in the route parameter id. 

***Property***

## End Points
### POST /properties
Above endpoint create/register a property. You are required to send valid property information in JSON format as the body of the request. The data fields for property creation includes: 

- propertyTitle: 
    - Required
    - Data type: String
- rentalPricePerNight: 
    - Required
    - Data type: Number
- propertyDesc: 
    - Optional
    - Data type: String
- propertyType: 
    - Required
    - Data type: String
    - Example: Cabin, Beach house, Apartment, Condo, Loft, Cottage...
- houseRules: 
    - Optional
    - Data type: Array of String
- amenities: 
    - Required
    - Data type: Array of String
- location
    - Required
    - Data type: String
- isBestseller
    - Required
    - Data type: Boolean
- propertyPhotoURL
    - Optional
    - Data type: String
    - *Note*: Should always use free stock photos from websites. Prevent copyright issues. Good stock photos websites includes: [Unsplash](https://unsplash.com/), [LifeofPix](https://www.lifeofpix.com/), etc. 

### GET /properties
Above endpoint able to retrieve all the properties in the database. 

### GET /properties?propertyType=...
Above endpoint able to filter and retrieve all the properties that belong to a specified type if the type exists in database. 

### GET /properties&location=...
Above endpoint able to filter and retrieve all the properties that belong to a specified location if the location exists in the database.

### GET /properties&isBestseller=true
Above endpoint able to filter and retrieve all the bestselling properties from the database. 

### GET /properties&isBestseller=false
Above endpoint able to filter and retrieve all the non-bestselling properties from the database. 

*Note* Allow to have one or multiple key value pairs. If have multiple, add ‘&’ after the first key value pair.

### GET /properties/:id
Based on the id that is provided in route parameter, above endpoint able to retrieve a specific property's information if the id exists inside of the databse. 

### PUT /properties/:id
Above endpoint allows to update an existing property by its id. Able to update any fields except id field, new property data required to be included in the body of the request in JSON format. The data can include ANY or MANY of the following: 
- propertyTitle
- rentalPricePerNight
- propertyDesc
- propertyType
- houseRules
- amenities
- location
- isBestseller
- propertyPhotoURL

### DELETE /properties/:id
Above endpoint allows to delete an existing property by its id provided. 

### GET /propertyTypes
Above endpoint allows us to retrieve all the non-duplicated property types that are currently existed in the database. 

## Validation
### Property Registration
When creating a new property to the database, all fields need to be entered with valid information. All required 
fields are mandatory and cannot be empty (OR only contain spaces). 
- **Property Title** field allow alphabetical strings or numbers. By considering the possibilities of '.' can also include inside of the Property Title, the space and period can be included in this field. 
- **Property Rental Price (per night)** field only allow numbers. It can be any positive integer or float numbers. 
- **Property Type** field can only store alphabetical string, can also accept spaces. 
- **House Rules** field allow alphabetical strings or numbers input. 
- **Amenities** field stores an array of amenities for the property. Each amenity will be validated before storage based on only alphabetical input and space are allowed. 
- **Location** field allows alphabetical strings, number and ','. This field is required and will be stored in database after validation
- **isBestseller** field stores boolean type of input. It only allows "true" or "false" those two input. Anything else will be rejected
- **Property Photo URL** field stores property photo URL, it has been validated with regex as well, only valid URL can be stored in database. 


### Property Retrieval 
- **Retrieve by ID**
When retrieving a specific property information by id, req.params.id also contain validation logic before retrieval. The IDs are being generated automatically by MongoDB, it contains 12-byte ObjectId value, which is a 24 characters string. Anything that is not 24 characters will be determined as invalid. All ids contain numbers and alphabets, any special characters is not allowed to include in the route parameter id. 

- **Retrieve with query string**
When retrieve/filter properties from the database based on query string, only propertyType, location, and isBestseller can be used as key value pairs inside of the query string. Anything else should return the 404 error code as the page is not found. 
Also, for isBestseller, only true or false can be filtered from all records in database. 

- **Update and Deletion by ID**
ID will also be validate before the action being taken, same method being used as "Retrieve by ID"

## Rules to Set up Application
1. Clone the source code by running: **git clone GITHUB_PROJECT_URL .**
2. After cloning, all third party dependencies and devDependencies should be reinstalled, **npm install** or **npm i**
3. Ensure that a folder named **config** being created
4. Create a file called **keys.env** inside of the **config** folder
5. Within the **keys.env** file, create the following environment variables
   - **MONGODB_QUERY_STRING** - Please assign your Database Connection String to the variable
   - **PORT** - Assign with 8080
   - Also make sure that **NODE_ENV** is not production
6. Run application by running : **npm run dev**
