const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String, require
    },
    Variants: [],
    prizes: [],
    category: { type: String, require },
    image: { type: String, require },
    description: { type: String, require },
})

const pizza = new mongoose.model("pizza", userSchema);

module.exports = pizza;