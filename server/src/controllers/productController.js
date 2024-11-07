const cloudinary = require('cloudinary').v2;
const Product = require('../modals/productModal');

exports.createProduct = async (req, res) => {
    try {
        const { sizes, name, price, category, star } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const imageUploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
                if (error) {
                    console.error('Cloudinary upload failed:', error);
                    reject(new Error('Image upload failed'));
                }
                resolve(result);
            });

            stream.end(req.file.buffer);
        });

        const product = new Product({
            image: imageUploadResult.secure_url,
            sizes: JSON.parse(sizes),
            name,
            price: Number(price),
            category,
            star: Number(star)
        });

        await product.save();

        res.json({
            success: true,
            message: "Product Added Successfully"
        });
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

exports.getProductsByIds = async (req, res) => {
    try {
        const { productIds } = req.body;
    
        if (!productIds || productIds.length === 0) {
          return res.status(400).json({ error: 'No product IDs provided' });
        }
    
        // Fetch products by productIds from the database
        const products = await Product.find({ '_id': { $in: productIds } });
    
        if (products.length === 0) {
          return res.status(404).json({ message: 'No products found' });
        }
    
        // Respond with the products
        res.status(200).json({ success: true, products });
      } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};