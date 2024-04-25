const {User, Auth} = require("../models")
const ApiError = require("../utils/apiError")
const {Op} = require("sequelize")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const validator = require("../middlewares/validator/registerValidation");

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const userData = await Auth.findOne({
            where: {
               email
            },
            include: ["User"]
        });
        if(!userData) return next("Email not register", 404)

        if(userData && bcrypt.compareSync(password, userData.password)){
            const token = jwt.sign(
                {
                    id: userData.userId,
                    username: userData.User.name,
                    role: userData.User.role,
                    email: userData.email,
                    shopId: userData.User.libraryId
                },
                process.env.JWT_SECRET,
                // uncoment this if want to give expired time for jwt
                // {
                //     expiresIn: process.env.JWT_EXPIRED
                // }
            )
            console.log("Login")
            res.status(200).json({
                status: "Success",
                message: "Success Login",
                data: token
            })
        }
        next(new ApiError("Wrong Password", 400))
    } catch (error) {
        next(new ApiError(error.message, 500))
    }
}

const register = async (req, res, next) => {
    try {
        const {error, value} = validator.validateRegisterInput(req.body)
        if(error) next(new ApiError(error, 400))
        
        const user = await Auth.findOne({
            where: {
                email: value.email}
        })
        
        if(user) return next(new ApiError("Email already teken", 400));

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(value.password, saltRounds);
        
        if(value.role == "Admin"){
            if(req.user.role !== "SuperAdmin") return next(new ApiError("Forbidden, you must have Super Admin role to make Admin account", 403))
        }

        createNewUser = await User.create({
            name: value.name,
            address: value.address,
            city: value.city,
            phone: value.phone,
            libraryId: 1,
            role: value.role,
        })

        await Auth.create({
            email:value.email,
            password: hashedPassword,
            userId: createNewUser.id
        })

        res.status(201).json({
            status: "Success",
            data: {
                createNewUser,
                email: value.email
            }
        })
    } catch (error) {
        next(new ApiError(error.message, 500))
    }
}

module.exports = {login, register}