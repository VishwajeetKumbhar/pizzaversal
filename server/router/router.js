const express = require("express");
const router = express.Router();
const pizza = require("../model/userSchema")
const USER = require("../model/usersSchemas")
const bcrypt = require("bcryptjs")
const authenicate = require("../middleware/authenticat")

// Get Pizza Data From DB
router.get("/getdata", async (req, res) => {
    try {
        const pizzaData = await pizza.find()
        res.status(201).json(pizzaData)
    } catch (error) {
        res.status(422).json(error)
    }
})

//register SignUp Users In DB

router.post("/register", async (req, res) => {
    const { name, email, mobile, password, cpassword } = req.body
    if (!name || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "Fill the all data" })
        console.log("not data avialable")
    };

    try {
        const preuser = await USER.findOne({ email: email });
        if (preuser) {
            res.status(422).json({ error: "this user is already present" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password and cpassword not match" })
        } else {
            const finalUser = new USER({
                name, email, mobile, password, cpassword
            })
            const storeData = await finalUser.save();
            console.log(storeData)
            res.status(201).json(storeData)
        }
    } catch (error) {

    }
})

//Get Data for Login From DB

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Fill the all Data" })
    }
    try {
        const userLogin = await USER.findOne({ email: email })
        // console.log(userLogin)
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            console.log(isMatch)
            const token = await userLogin.generateAuthtoken()

            res.cookie("Amazonweb", token, {
                expires: new Date(Date.now() + 2589000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Details" })

            } else {
                res.status(201).json(userLogin)

            }
        }
        else {
            res.status(400).json({ error: "Invalid Details" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details" })

    }
})

//API for Adding Pizza Into Cart

router.post("/addCart/:id", authenicate, async (req, res) => {
    try {
        const { id } = req.params;
        const pizzaCart = await pizza.findOne({ _id: id })
        console.log("pizzaCart is Here", pizzaCart)

        const userContact = await USER.findOne({ _id: req.userID })
        console.log("userContact Is Here", userContact)

        if (userContact) {
            const pizzaCartData = await userContact.addTocarts(pizzaCart)

            await userContact.save();
            // console.log("Login Cart Data", pizzaCartData)
            res.status(201).json(userContact)
        }
        else {
            res.status(404).json(userContact)
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid User Cart" })
        console.log("user Cart invalid", error)
    }
})

// Api for Get Indivisual Pizza Data
//Add to Cart
router.get("/singlepizza/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const indivisualPizza = await pizza.findOne({ _id: id })
        res.status(201).json(indivisualPizza)
    } catch (error) {
        console.log("error", error)
    }
})


// get User Cart 
router.get("/cartdetails", authenicate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        res.status(201).json(buyuser);

    } catch (error) {
        console.log("CartDetail Error", error)
    }
})


// get valid user
router.get("/validuser", authenicate, async (req, res) => {
    try {
        const validuserone = await USER.findOne({ _id: req.userID });
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error" + error)
    }
})

// remove Item from Cart
router.get("/delete/:id", authenicate, async (req, res) => {
    try {
        const product = req.params;
        console.log("Try to delete this id", product.id)
        req.rootUser.carts = req.rootUser.carts.filter((eId) => {
            return eId._id != product.id
        })
        req.rootUser.save()
        res.status(201).json(req.rootUser);
        console.log("item remove")
    } catch (error) {
        console.log("Error" + error)
        res.status(400).json(req.rootUser)
    }
})

// User Logout
router.get("/logout", authenicate,(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curele)=>{
            return curele.token !== req.token
        })
        res.clearCookie("Amazonweb",{path:"/"})
        req.rootUser.save()
        res.status(201).json(req.rootUser.tokens)
        console.log("User Logout")
    } catch (error) {
        console.log("Youser Logout Error" , error)
    }
})

module.exports = router; 