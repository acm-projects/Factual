const fs = require('fs');
const axios = require('axios');
const https=require('https');
const bodyParse=require('body-parser');
const express =require("express");
let text; 
const app=express();



//Read in file
const get_api =async()=>{
	console.log("Function"); 
	fs.readFile('/home/ragdoll/ACM_Projects/data.txt',async (err, data)=>  {
		//Throws error if file does not exist
		if (err){
			 throw err;
		}
		 console.log("continue");

		//Converts data to a string tipe
		text=data.toString();
		//Replaces /n
		text=text.replace("\n","");
		//send output to console
		console.log("Before"+text);
		return text;
	})
}
//

const set_api=async()=>{
	const key=await get_api();
	console.log(key);
}
let claim="5g";
let key=key;
set_api();
console.log("After"+key);
let url="https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-us&maxAgeDays=100&pageSize=5&pageToken=1&query="+claim+"&key="+key;
https.get(url,function (res){
	console.log(res.statusCode);
	let chunks=[];
	res.on("data",function(data){
		chunks.push(data);
	}).on("end",function(){
		let jdata=Buffer.concat(chunks);
		let schema=JSON.parse(jdata);
		let claims=schema.claims;
		console.log(schema);
		console.log("Seperate");
		console.log(claims);
		let review=claims[0].claimReview;
		console.log("Seperate");
		console.log(review);
	let myPromise=new Promise(function(myResolve,myReject){
		let url=review.url;
		myResolve();
		myReject();
	
	});
	myPromise.then(
		console.log("url: "+url)
	);
	console.log("Review");
	console.log(review);

	})
})


