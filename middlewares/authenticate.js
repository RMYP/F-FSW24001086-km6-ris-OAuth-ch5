const jwt = require("jsonwebtoken");
const {User, Auth} = require("../models");
const ApiError = require("../utils/apiError");

module.exports = async (req, res, next) => {
      try {
        const bearerToken = req.headers.authorization;
        
        if(!bearerToken) return next(new ApiError("Token not found", 401))

        const token = bearerToken.split("Bearer "[1]);
        let payload;

        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        }catch{
            next(new ApiError("Token Unvalid", 401));
        }
        
        const user = await User.findByPk(payload.id, {
            inlude: ["Auth"],
        })

        req.user = user;
        req.payload = payload;
        next()
      } catch (error) {
        
      }
}