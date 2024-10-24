const cloudinary = require('cloudinary').v2;
const Product = require('../modals/productModal');

exports.createProduct = async (req, res) => {
    try {
        const { sizes, name, price, category, star } = req.body;
        const image = req.body.image;


        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const imageUploadResult = await cloudinary.uploader.upload(image, { folder: 'products' })
        .catch((err) => {
            console.error('Cloudinary upload failed:', err);
            throw new Error('Image upload failed');
        });

        console.log(imageUploadResult)
    

        const product = new Product({
            image: imageUploadResult.secure_url,
            sizes,
            name,
            price,
            category,
            star
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { sizes, ...productData } = req.body;
        const updatedProductData = { ...productData };

        if (req.body.image) {
            const imageUploadResult = await cloudinary.uploader.upload(req.body.image, { folder: 'products' });
            updatedProductData.image = imageUploadResult.secure_url;
        }

        if (sizes) {
            updatedProductData.sizes = sizes;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedProductData, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
