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
    stack: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative']
    },
    ownerName: {type: String},
    ownerphone: {type:String},
    owneremail: {type: String},
    certificates: {
        type: [String],
        required: false
    }
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
