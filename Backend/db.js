const mongoose = require('mongoose')
// nO4dOH3I5516Ag96
// user: sktiwari790
// Url : mongodb+srv://sktiwari790:<password>@cluster0.duqudxz.mongodb.net/?retryWrites=true&w=majority
//  const mongoURI = "mongodb+srv://sktiwari790:nO4dOH3I5516Ag96@cluster0.duqudxz.mongodb.net/fitness?retryWrites=true&w=majority"
 const mongoURI = "mongodb://127.0.0.1/fitnesh"

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB
