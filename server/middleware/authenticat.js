const jwt = require("jsonwebtoken")
const USER = require("../model/usersSchemas")
require('dotenv').config();
const secKey = process.env.KEY

const autheticate = async (req, res, next) => {
    try {
        const token = req.cookies.Amazonweb

        const verifyToken = jwt.verify(token, secKey)
        // console.log("VerifyToken", verifyToken);

        const rootUser = await USER.findOne({ _id: verifyToken._id, "tokens.token": token })
        // console.log("RootUser", rootUser)
        // console.log("Rootuser ID", rootUser._id)    

        if (!rootUser) {
            throw new Error("User Not Found")
        }
        req.token = token
        req.rootUser = rootUser
        req.userID = rootUser._id;

        next()
    } catch (error) {
        res.status(401).send("Unauthoraised : no Token Provied")
        console.log(error)
    }
}
module.exports = autheticate;