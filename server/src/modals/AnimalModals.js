const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String },
    bannerImages: [{ type: String }],
    type: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: String },
    gender: { type: String },
    year: { type: String },
    color: { type: String },
    location: {type: String},
    stack: {type: Number},
    ownerName: {type: String},
    phone: {type:String},
    email: {type: String}
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
