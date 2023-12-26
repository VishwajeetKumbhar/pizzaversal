const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const secKey = process.env.KEY
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid Email address")
            }
        }
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    carts: Array
})

//password Hash
usersSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
})

// token generate process
secKey = "kdsbfkdsvgkjnhvorhvnuetvoyuowerohneohovg"
usersSchema.methods.generateAuthtoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, secKey)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token
    } catch (error) {
        console.log("jwt token errr", error)
    }
}

// add toCart Data
usersSchema.methods.addTocarts = async function (e) {
    try {
        console.log("This is me i am here")
        this.carts = this.carts.concat(e)
        await this.save()
        console.log(this.carts, "userChema Carts")
        return this.carts;
    } catch (error) {
        console.log("Card not added", error)
    }
}



const USER = new mongoose.model("USER", usersSchema)



module.exports = USER