require('dotenv').config({ path: __dirname + '/keys.env' });

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();


let claim="5g"
const key = process.env.API_KEY

let url = "https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-us&maxAgeDays=100&pageSize=5&pageToken=1&query="+ claim+"&key="+key;


https.get(url, function(res){
    console.log(res.statusCode);
    let chunks =[];
    res.on("data", function(data){
        chunks.push(data);              
    }).on("end",function(){
        let jdata=Buffer.concat(chunks);
        let schema = JSON.parse(jdata);
        console.log(schema);
        let claims = schema.claims;
        let review = claims[0].claimReview;
       let url = review.url;
       
        let myPromise = new Promise(function (myResolve, myReject) {
            let url = review.url;
            // "Producing Code" (May take some time)

            myResolve(); // when successful
            myReject();  // when error
        });

        myPromise.then(
            console.log("url: " + url) 
        );

        console.log(review);


    })
})



