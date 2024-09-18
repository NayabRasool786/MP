const mongoose = require("mongoose");
//requiring the data which is the object of data.js file
const initData = require("./data.js")
//requiring the model from listing.js
const Listing = require("../models/listing.js");


//Copying link from the mongoose.com and storing in a variable
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//Calling Main() to run DB and run the code
main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

// To Create DataBase WE need to build ASYNC Function Called "Main()"
async function main() {
    await mongoose.connect(MONGO_URL);//either we can add direct URL available from website
};


const initDB = async ()=>{
   await Listing.deleteMany({}); //delete old data from database
   await Listing.insertMany(initData.data); // accessing imported "data" object from initData which is required
   console.log("Data was Initialised");
};


// calling initDB function to initiate the database with initial data 
initDB();