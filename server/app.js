const express = require("express")
const app = express();
const mongoose = require("mongoose")
require("./db/conn");
const users = require("./model/userSchema")
const cors = require("cors")
const PORT = process.env.PORT || 8005
const router = require("./router/router")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const authenticate = require("./middleware/authenticat")

require('dotenv').config();
app.use(cors());
app.use(cookieParser(""))
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log("server is start on Port 8005")
})

