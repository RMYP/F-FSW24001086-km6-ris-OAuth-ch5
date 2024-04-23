const {User, Auth} = require("../models")
const ApiError = require("../utils/apiError")
const {Op} = require("sequelize")
const jwt = require("jsonwebtoken")

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const userData = Auth.findOne({
            where: {
                [Op.eq] : email
            },
            include: ["User"]
        });
        if(!userData) return next("Email not register", 404)
        if(user && bcrypt.compareSync(password, user.password)){
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
        next(new ApiError(error.messagem, 500))
    }
}