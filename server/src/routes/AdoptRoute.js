const express = require('express');
const AdoptRouter = express.Router();
const adoptController = require('../controllers/AdoptController');

AdoptRouter.get('/', adoptController.getAllAdoptions);
AdoptRouter.get('/:id', adoptController.getAdoptionById);
AdoptRouter.post('/add', adoptController.createAdoption);
AdoptRouter.put('/:id', adoptController.updateAdoption);
AdoptRouter.delete('/:id', adoptController.deleteAdoption);

module.exports = AdoptRouter;
