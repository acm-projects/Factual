const {check, validationResult} = require('express-validator')

exports.validateUserSignUp = [
    check('fname').trim().not().isEmpty().withMessage('First name is empty').isString().withMessage('ivalid First name').
    isLength({min: 2, max: 10}).
    withMessage('First name must be between 2-10 characters long!'),
    check('lname').trim().not().isEmpty().withMessage('Last name is empty').isString().withMessage('ivalid Last name').isLength({min: 2, max: 15}).
    withMessage('Last name must be between 2-15 characters long!'),
    check('email').not().isEmpty().withMessage('email is empty').normalizeEmail().isEmail().withMessage('email is invalid'),
    check('password').trim().not().isEmpty().withMessage('password is empty').isLength({min: 8, max: 20}).
    withMessage('Password must be within 8 to 20 characters long!')
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if(!result.length) return next();

    const error = result[0].msg;
    res.json({success: false, message: error});
}


exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('email is invalid'),
    check('password').trim().not().isEmpty().withMessage('passowrd is invalid')
];