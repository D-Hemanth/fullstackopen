const mongoose = require('mongoose')

const password = process.argv[2]

// phonebookApp is not part of the connect link generated by mongodb, its a name i've given to the collection for storing contacts in mongodb
const url = `mongodb+srv://fullstack:${password}@cluster0.z6ybgse.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

