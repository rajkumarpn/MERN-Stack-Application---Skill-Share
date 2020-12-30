const mongoose = require('mongoose');
require('dotenv').config()

const URI = process.env.DB_URI;

const DbConnect =async () =>{
    try{
        await mongoose.connect(URI, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false});
        console.log("Connected to mongoose");
    }catch(err){
        throw err
        process.exit(1)
    }

}

module.exports = DbConnect;