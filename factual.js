//imports
const fs = require('fs');
const axios = require('axios');
const https=require('https');
const bodyParse=require('body-parser');
const express =require("express");
var text; 
const app=express();


var claim="Trump lost the 2020 election";
var key=key;


var url="https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-us&maxAgeDays=100&pageSize=5&pageToken=1&query="+claim+"&key="+key;

https.get(url,function (res){   
	//console.log(res.statusCode);
	var chunks=[];
	//grab data
	res.on("data",function(data){
		chunks.push(data);
	})
	
	
	res.on("end",function(){
		var jdata=Buffer.concat(chunks);
		var schema=JSON.parse(jdata);

		console.log(schema);
		console.log("\n");
		//gathers info of claim
		var claims=schema.claims;
		

		for(let i=0;i<claims.length;i++){
		
			//Grabs one claim
			var review=claims[i].claimReview;
			var claimant=claims[i].claimant;
			//var claimant=schema[i].claimant;
			console.log(review);
			review=review[0];
	
			//console.log("name: "+review.publisher.name);
			console.log("Claimant: "+claimant);
			console.log("site: "+review.publisher.site);
			console.log("url: "+review.url);
			console.log("title: "+review.title);
			console.log("Rating: "+review.textualRating);
		}
	})
	
})
