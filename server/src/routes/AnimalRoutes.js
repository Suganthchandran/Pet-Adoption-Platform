const express = require('express');
const animalController = require('../controllers/AnimalController');
const upload = require('../middleware/multer.js');

const AnimalRouter = express.Router();

AnimalRouter.post('/', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bannerImages', maxCount: 2 },
    { name: 'certificates', maxCount: 3 }
]), animalController.createAnimal);
AnimalRouter.get('/', animalController.getAllAnimals);
AnimalRouter.get('/:id', animalController.getAnimalById);
AnimalRouter.put('/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bannerImages', maxCount: 2 },
    { name: 'certificates', maxCount: 3 }
]), animalController.updateAnimal);
AnimalRouter.delete('/:id', animalController.deleteAnimal);

module.exports = AnimalRouter;
