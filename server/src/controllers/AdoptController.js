const Adopt = require('../modals/AdoptModal');
const Animal = require('../modals/AnimalModals')

const adoptController = {

    getAllAdoptions: async (req, res) => {
        try {
            const adoptions = await Adopt.find();
            res.status(200).json(adoptions);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching adoption requests', error });
        }
    },

    getAdoptionById: async (req, res) => {
        try {
            const adoption = await Adopt.findById(req.params.id);
            if (!adoption) {
                return res.status(404).json({ message: 'Adoption request not found' });
            }
            res.status(200).json(adoption);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching adoption request', error });
        }
    },

    createAdoption: async (req, res) => {
        try {
            const { name, email, phone, city, address, message, animalId, animalName, ownername, ownerphone, owneremail } = req.body;
    
            const animal = await Animal.findById(animalId);
    
            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }
    
            if (animal.stack <= 0) {
                return res.status(400).json({ message: 'No stock available for this animal' });
            }
    
            animal.stack -= 1;
            await animal.save();
    
            const newAdoption = new Adopt({
                name,
                email,
                phone,
                city,
                address,
                message,
                animalId,
                animalName,
                ownername,
                ownerphone,
                owneremail
            });
    
            const savedAdoption = await newAdoption.save();
            res.status(201).json(savedAdoption);
        } catch (error) {
            console.error('Error creating adoption request:', error);
            res.status(400).json({ message: 'Error creating adoption request', error });
        }
    },
    

    updateAdoption: async (req, res) => {
        try {
            const updatedAdoption = await Adopt.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedAdoption) {
                return res.status(404).json({ message: 'Adoption request not found' });
            }
            res.status(200).json(updatedAdoption);
        } catch (error) {
            res.status(400).json({ message: 'Error updating adoption request', error });
        }
    },

    deleteAdoption: async (req, res) => {
        try {
            const deletedAdoption = await Adopt.findByIdAndDelete(req.params.id);
            if (!deletedAdoption) {
                return res.status(404).json({ message: 'Adoption request not found' });
            }
            res.status(200).json({ message: 'Adoption request deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting adoption request', error });
        }
    },
};

module.exports = adoptController;
