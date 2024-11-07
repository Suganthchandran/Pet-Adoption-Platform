const mongoose = require('mongoose')

const adoptSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    message: {type: String, required: true},
    animalName: {type: String, required: true},
    ownername: {type: String, required: true},
    ownerphone: {type: String, required: true},
    owneremail: {type: String, required: true},
})

const adoptModel = mongoose.models.adopt || mongoose.model("adopt",adoptSchema);

module.exports = adoptModel;