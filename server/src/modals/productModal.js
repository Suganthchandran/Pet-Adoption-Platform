const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    star: { type: Number, required: true },
    category: { type: String, required: true },
    sizes: { type: Array, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

module.exports = productModel;
