const mongoose = require('mongoose')

// when using .env variable to store the url, make sure to add config variable of MONGODB_URI for heroku
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    }) 

// Add a schema which tells Mongoose how the note objects are to be stored in the database
// Also add way for validating the format of the data before it is stored in the database using validation functionality of mongoose i.e. name, number
const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
                // [1-9][0-9][0-9] will match double digit number from 100 to 999 & \d+ or \d{1,} matches with atleast 1 or more number
                return /[1-9][0-9][0-9]-\d{1,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number of format DD-DDDDDD... or DDD-DDDDD,,,`
        },
        minlength: 8,
        required: true
    }
})

// to remove unique id field _id & mongo versioning field __v from the frontend output
// One way to format the objects returned by Mongoose is to modify the toJSON method of the schema
// for get route When the response is sent in the JSON format, the toJSON method of each object in the array is called automatically by the JSON.stringify method
// toJSON is responsible to define what data will be serialized(taken as input) to convert to json format
phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Create a Person document model from the schema variable
// public interface of the module is defined by setting a value to the module.exports variable here we have set the value to be the Note model
module.exports = mongoose.model('Person', phonebookSchema)