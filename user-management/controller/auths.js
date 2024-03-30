const User = require("../model/user");
const ErrorResponse = require('../utils/errorResponse');


exports.signup = async (req, res, next) => {

    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        return next(new ErrorResponse('E-mail already exists', 400))
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json({
             success:true,
            user
        })

    } catch (error) {
        console.log(error);
        next(error);
    }

}


exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
 
            return next(new ErrorResponse('E-mail and password are required', 400))
        }

        // check user e-mail
        const user = await User.findOne({ email });
        if (!user) {

            return next(new ErrorResponse('Invalid credentials', 400))
        }

        // verify user password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {

            return next(new ErrorResponse('Invalid credentials', 400))
        }
        // res.json({
        //     _id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     token: generateToken(user._id),
        //   })

        generateToken(user, 200, res);
    }
    catch (error) {
        console.log(error);

        next(new ErrorResponse('Cannot log in, check your credentials', 400))
    }

}


const generateToken = async (user, statusCode, res) => {

    const token = await user.jwtGenerateToken();

    const options = {
        httpOnly: true,
       // expires: new Date(Date.now() + process.env.EXPIRE_TOKEN)
        expiresIn:  '1h',
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token })
}


//LOG OUT USER
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}



// USESR PROFILE 
exports.userProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id);
    res
    .status(200)
    //.cookie('token')
    //.getCookie('token')
    .json({
        success: true,
        user
    });
}

exports.updateUser = async (req, res, next) => {

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(201).json({
            success: true,
            message: "User Profile Updated Successfully",
            updateUser
        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}