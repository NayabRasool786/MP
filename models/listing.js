// requiring mongoose 
const mongoose = require('mongoose');
//creating a variable
const Schema= mongoose.Schema;

// creating listing schema
const listingSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      filename: {
        type: String,
        //required: true,
        default: 'listingimage', // Default filename if not provided
      },
      url: {
        type: String,
        //required: true,
        default: 'https://st3.depositphotos.com/23594922/31822/v/1600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg', // Default image URL if not provided
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Assuming prices are non-negative
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  });
  

// creating mongoose model from schema to export
const Listing = mongoose.model("Listing", listingSchema);

// Exporting Model
module.exports = Listing;