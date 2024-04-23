const {User, Auth} = require("../models")
const ApiError = require("../utils/apiError")
const {Op} = require("sequelize")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const userData = Auth.findOne({
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
                    shopId: user.shopId
                },
                process.env.JWT_SECRET,
                // uncoment this if want to give expired time for token
                // {
                //     expiresIn: process.env.JWT_EXPIRED
                // }
            )

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

module.exports = {login}