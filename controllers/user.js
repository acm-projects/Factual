const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const {fname, lname, email, password} = req.body;
   
    const isNewUser = await User.isThisEmailInUse(email)

    if(!isNewUser){
        return res.json({
            success: false,
            message: 'This email is already in use'
        })
    }

    const user = await User({
       fname,
       lname,
       email,
       password
    });

    
    await user.save();
    res.json({user, success: true, message: 'user successfully added'});
    
}

exports.userSignIn = async (req, res) => {

    const {email, password} = req.body
    // let email2 = await email.toLowerCase();
    const user = await User.findOne({email});
    if(!user) return res.json({success: false, message: 'user not found, with the given email', emailProvided: email});

    const isMatch = await user.comparePassword(password)
    if(!isMatch) return res.json({success: false, message: 'password does not match'})

   const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.json({success:true, user, token})
};

