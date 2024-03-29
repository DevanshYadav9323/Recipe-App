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


// This is to test Internal Server Error handling , do not uncomment

// app.use(internetconnection);
// function internetconnection(req,res,next){
//     throw new Error(500)
// }


// Declaring the routes 
app.get("/" , (req , res) => {
    res.render("index")
});


// This will send request to api for recipes and display the information fetched
app.post("/search" , async (req , res) => {
    const {query} = req.body;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`);
    const recipes = response.data.results;
    console.log(recipes);
    res.render("results" , {recipes});
});


// This will fetch the id from url and request the api for recipe of particular dish
app.get("/recipe/:id" , async (req , res) => {
    const {id} = req.params;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    const recipe = response.data;
    console.log(recipe);
    res.render("recipe" , {recipe})
});


// Handling non matching request from the client
app.use((req, res, next) => { 
    res.status(404).render("404page")
}) 

// Internal server error middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    // res.status(500).send('Something broke!')
    res.status(500).render("500page")
})


app.listen( PORT , ()=>{
    console.log(`The app is listening at http://localhost:${PORT}`);
});

