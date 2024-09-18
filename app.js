// Basic Code SetUp By Requiring few Operations
const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
//importing listing model
const Listing = require("./models/listing.js");
//Setting up EJS
const path = require("path");
//Method OverRide Requireing to change API Methods
const methodOverride = require("method-override");
// Requiring EJS Mate 
const ejsMate = require("ejs-mate");




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

//Setting up EJS for rendering views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({wxtended:true})); // data comes under request will be parsed by using this
app.use(methodOverride("_method"));//using methodOverride package or Using Method In a MethodOverride
app.engine("ejs", ejsMate);  //Middleware to use EJS Mate
app.use(express.static(path.join(__dirname, "/public")));  //Setting up Static Folder or use static files with templates 
 
//Creating A Basic API with Root"/"
app.get("/",(req,res)=>{
    res.send("Hi this is home/root page");
});

// This API will fetch all listings from MongoDB
//Index Route
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});

// This API will create a new listing
//Show Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let { id } = req.params; // extracting id from the parameters
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing }) // req.body.listing is a javaScript Object and inside that body it will extract the parameters and convert into individual values and pass into our new updated value
    res.redirect(`/listings/${id}`);
});


// This API will fetch a single listing by ID
// Show Route  
app.get("/listings/:id", async (req,res)=>{
    let { id } = req.params; //find by the basis of "id"
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});


// This API will create a listing
//Create Route
app.post("/listings",async(req,res)=>{
   // let {title,description,image,price,country,location}=req.body;
   // another way to access is update in html code as a arrays and then write below lines 
    const newListing = new Listing(req.body.listing);
    //console.log(newListing);
    await newListing.save();
    res.redirect("/listings"); 
});


// This API will update a single listing by ID
// Edit Route
app.get("/listings/:id/edit", async(req,res)=>{
    let { id } = req.params; //find by the basis of "id"
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});  
});

app.delete("/listings/:id",async(req,res)=>{
    let { id } = req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    //onsole.log(deletedListing);
    res.redirect("/listings");  //redirecting to the home page after deleting the listing
});
// every mongo access  api must be in async function
// Here is the sample URL to test by adding a sample document 
        // app.get("/testListing", async(req,res)=>{
        //     // creating a sample listing
        //     let sampleListing = new Listing({
        //     title:"My New Villa",
        //     description:"This is a beautiful villa in the heart of the city",
        //     price:300000,
        //     location:"New York City,USA",
        //     country:"India",
            
        //     });
        //     //  saving it into MongoDB
        //     await sampleListing.save();
        //     console.log("Sample was saved");
        //     res.send("Sample listing created successfully");
        // });

//Setting Port 8080 and test by "nodemon app.js" 
app.listen(8080,()=>{
    console.log("server is running on port 8080");
});
