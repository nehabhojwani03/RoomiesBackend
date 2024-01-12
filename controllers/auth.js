const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aysnc');
const User = require('../models/User');

//@desc     Register user
//@route    POST/api/v1/auth/register
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
    const {username, name, email, phoneno, password}=req.body;

    //create user
    const user= await User.create({ username, name, email, phoneno, password});

    res.status(200).json({
        success: true,
        data: user
    });
});


//@desc Login
//@route POST/api/v1/auth/register
//@access Public
exports.login = asyncHandler(async(req, res, next) => {
    const {email, username, password} = req.body;

    if((!email && !username) || (!email && !username) || !password) {
        return next(new ErrorResponse("Please provide either username or email and password", 400));
    }exports
    const user = await User.findOne(email ? {email} : {username}).select(
        '+password'
    );
    if(!user){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    res.status(200).json({
        success: true,
        message: 'login successful'
    });

});

//@desc    Update user details
//@route   PUT/api/v1/updatedetails
//@access  private
exports.updateDetails = asyncHandler(async(req,res,next) =>{
    const fieldsToUpdate= {
        name: req.body.name,
        email: req.body.email,
    };
    const user= await User.findByIdAndUpdate(req.user.id, fieldsToUpdate,{
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        data: user,
    });
});

