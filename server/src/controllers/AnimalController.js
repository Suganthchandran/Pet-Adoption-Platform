const Animal = require('../modals/AnimalModals');
const cloudinary = require('cloudinary').v2;


exports.createAnimal = async (req, res) => {
    try {
        console.log("Inside createAnimal function...");
        const { name, desc, type, breed, age, gender, year, color, location, stack, ownerName, ownerphone, owneremail } = req.body;
        
        if (!req.files || !req.files.image || !req.files.image[0]) {
            return res.status(400).json({ error: "Image file is required." });
        }

        const imageBuffer = req.files.image[0].buffer;
        const imageMimetype = req.files.image[0].mimetype;

        const imageUploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'animals', mimeType: imageMimetype },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(imageBuffer);
        });

        const bannerImages = [];
        if (req.files.bannerImages && req.files.bannerImages.length > 0) {
            const bannerUploadPromises = req.files.bannerImages.map(async (img) => {
                const buffer = img.buffer;
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'image', folder: 'animals' },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    ).end(buffer);
                });
                return result.secure_url;
            });
            
            bannerImages.push(...await Promise.all(bannerUploadPromises));
        }

        const certificates = [];
        if (req.files.certificates && req.files.certificates.length > 0) {
            const certificateUploadPromises = req.files.certificates.map(async (cert) => {
                const buffer = cert.buffer;
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'raw', folder: 'animals/certificates' },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    ).end(buffer);
                });
                return result.secure_url;
            });
            
            certificates.push(...await Promise.all(certificateUploadPromises));
        }

        const animal = new Animal({
            image: imageUploadResult.secure_url,
            name,
            desc,
            type,
            breed,
            age,
            gender,
            year,
            color,
            location,
            stack: Number(stack),
            ownerName,
            ownerphone,
            owneremail,
            bannerImages,
            certificates
        });

        await animal.save();
        res.status(201).json({ success: true, message: "Product Successfully Added", animal });

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

        if (certificates && certificates.length > 0) {
            const certificateUploadPromises = certificates.map(async (cert) => {
                return await cloudinary.uploader.upload(cert, { folder: 'animals/certificates', resource_type: 'raw' });
            });
            updatedAnimalData.certificates = (await Promise.all(certificateUploadPromises)).map(cert => cert.secure_url);
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
