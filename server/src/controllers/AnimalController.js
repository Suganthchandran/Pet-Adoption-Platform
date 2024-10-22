const Animal = require('../modals/AnimalModals');
const cloudinary = require('cloudinary').v2;

exports.createAnimal = async (req, res) => {
    try {
        const { image, bannerImages, ...animalData } = req.body;

        const imageUploadResult = await cloudinary.uploader.upload(image, { folder: 'animals' });
        const bannerImagesUploadPromises = bannerImages.map(async (img) => {
            return await cloudinary.uploader.upload(img, { folder: 'animals' });
        });
        const bannerImagesUploadResults = await Promise.all(bannerImagesUploadPromises);

        const animal = new Animal({
            image: imageUploadResult.secure_url,
            bannerImages: bannerImagesUploadResults.map(img => img.secure_url),
            ...animalData
        });

        await animal.save();
        res.status(201).json(animal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAnimal = async (req, res) => {
    try {
        const { image, bannerImages, ...animalData } = req.body;

        const updatedAnimalData = { ...animalData };

        if (image) {
            const imageUploadResult = await cloudinary.uploader.upload(image, { folder: 'animals' });
            updatedAnimalData.image = imageUploadResult.secure_url;
        }

        if (bannerImages && bannerImages.length > 0) {
            const bannerImagesUploadPromises = bannerImages.map(async (img) => {
                return await cloudinary.uploader.upload(img, { folder: 'animals' });
            });
            updatedAnimalData.bannerImages = (await Promise.all(bannerImagesUploadPromises)).map(img => img.secure_url);
        }

        const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, updatedAnimalData, { new: true, runValidators: true });
        if (!updatedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(updatedAnimal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAnimal = async (req, res) => {
    try {
        const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
        if (!deletedAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
