require('dotenv').config({ path: __dirname + '/keys.env' });
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://0.0.0.0:27017/Factual2DB", { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    saved: Array
});
const Accounts = mongoose.model("Account", userSchema);

let article = {
    publisher: String,
    site: String,
    title: String,
    url: String,
    textualRating: String
}


let claim="5g causes"
const key = process.env.API_KEY

let url = "https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-us&maxAgeDays=100&pageSize=5&pageToken=1&query="+ claim+"&key="+key;
let pub;
let claims;
https.get(url, function(res){
   
    console.log(res.statusCode);
    let chunks =[];
    res.on("data", function(data){
        chunks.push(data);              
    }).on("end",function(){
        let jdata=Buffer.concat(chunks);
        let schema = JSON.parse(jdata);
        // console.log(schema);
         claims = schema.claims;
        console.log("size " + claims.length);
        // let review = claims[0].claimReview;
       console.log(claims);
        // let myPromise = new Promise(function (myResolve, myReject) {
            
        //     pub = review[0].publisher;
        //     article.publisher = pub.name;
        //     article.site = pub.site
        //     article.title = review[0].title
        //     article.url = review[0].url
        //     article.textualRating = review[0].textualRating;

            
        //     myResolve(article);
        //     // myReject();  
        // });

        // // myPromise.then(
        // //     console.log(article)
        // // )
    });
   
}).on('error', function(e) {
    // Call callback function with the error object which comes from the request
    
});





app.get("/", function (req, res) {
    res.render("index");
})

app.get("/articles", function(req, res){
    res.render("articles", {claims: claims});
})



app.post("/save", function(req, res){


let data = "im article 3"
//console.log(articlez[0]);

Accounts.findOneAndUpdate({email: "hector@gmail.com"},{$push: {saved: data}}, function(err, person){

    if(err){
        console.log(err);
    }
    else if(person===null){
        console.log("user not found");
    }
    else{
        console.log("added article: ");
        console.log("current persons list of articles: " + person.saved);
    }
})

});



app.post("/signin",  function(req, res){
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    console.log("email: " + email + " password: " + password);

    Accounts.findOne({ email: email, password: password }, function (err, person) {
        if (err) {
            console.log("error: " + error);
        }
        else if(person===null){
            res.send("<h2> user not found</h2>");
        }
        else {
            console.log(person);
            console.log("Success");
            res.send("<h2> Successfully found </h2>");
        }
    });
    


});



app.post("/signup", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log("email: " + email + " password: " + password);

    Accounts.create({email:email, password:password}, function(err,doc){
        if(err){
            console.log("error adding to db: " + err);
        }
        else{
            console.log("succesfully added to db");
        }

    });
    res.send("<h2> THANKS </h2>")


})
app.listen(3000, function () {
    console.log("Server is running in FULL effect");
});
