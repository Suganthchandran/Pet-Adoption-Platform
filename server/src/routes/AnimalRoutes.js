const express = require('express')
const animalController = require('../controllers/AnimalController')

const AnimalRouter = express.Router();

AnimalRouter.post('/', animalController.createAnimal);
AnimalRouter.get('/', animalController.getAllAnimals);
AnimalRouter.get('/:id', animalController.getAnimalById);
AnimalRouter.put('/:id', animalController.updateAnimal);
AnimalRouter.delete('/:id', animalController.deleteAnimal);

module.exports = AnimalRouter;