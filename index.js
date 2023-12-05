// Importing required packages
const express = require("express");
const axios = require("axios");
const ejs = require("ejs");
const dotenv = require("dotenv");


// Configuring the path for .env file
dotenv.config({path: "./.env"});


// Initializing the app and declaring the necessary values
const app = express();
const PORT = process.env.port;
const API_KEY = process.env.spoonacular_api_key;


// Setting the view for ejs 
app.set("view engine" , "ejs");


// This will allow us to use static files (CSS) from our public folder
app.use(express.static("public"));


// Configures Express to handle form data in 'application/x-www-form-urlencoded' format
// using the 'querystring' library for parsing
app.use(express.urlencoded({extended: false}));


// Declaring the routes 
app.get("/" , (req , res) => {
    res.render("index")
});


// This will send request to api for recipes and display the information fetched
app.post("/search" , async (req , res) => {
    const {query} = req.body;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`);
    const recipes = response.data.results;
    res.render("results" , {recipes});
});


// This will fetch the id from url and request the api for recipe of particular dish
app.get("/recipe/:id" , async (req , res) => {
    const {id} = req.params;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    const recipe = response.data;
    res.render("recipe" , {recipe})
});


app.listen( PORT , ()=>{
    console.log(`The app is listening at http://localhost:${PORT}`);
});

