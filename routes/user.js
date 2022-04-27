const express = require('express');
const axios = require('axios');
const router = express.Router();
const {createUser, userSignIn} = require('../controllers/user');
const { isAuth } = require('../middleware/auth');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middleware/validation/user');
const User = require('../models/user');

let apiUrl = 'http://127.0.0.1:5000/factual/'

router.post('/create-user', validateUserSignUp, userValidation,createUser);
router.post('/sign-in', validateUserSignIn ,userValidation, userSignIn);


router.post('/search', async (req, res) =>{

   const claim = req.body.claim  
   
    axios.get(apiUrl+claim).then(response => {
        console.log(response.data);
      res.json(response.data)
    })

})

router.post('/save-article', async (req, res)=>{
    res.send('welcome u are in secret route');

    const {article} = req.body
    let email = req.body.email;
    let email2 = email.toLowerCase();
    console.log(email2);

    // if(!user) return res.status(401).json({success: false, message: 'unauthorized access!'});
    // let article1 = {
    //     'politcalBias': 0.99,
    //     'accuarcy': true,
    //     'url': 'https://somearticle.com',
    //     'related claim': 'I am cool' 
    // }
    try {
        User.findOneAndUpdate({email: email2}, {$push: {articles: article}}, 
            function(err, person){
                if(err){
                    console.log('error finding id? ' +err);
                    
                }
                else if (person===null){
                    console.log('user not found');
                   
                }
                else{
                    console.log('successfully saved article');
                }
            });
    } catch (error) {
        console.log('error adding article: ', error.message);
    }
})
module.exports = router;