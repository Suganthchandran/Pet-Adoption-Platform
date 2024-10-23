import React, { useState } from 'react';
import '../styles/Shop.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import DogImage from '../assets/Dog_image.jpg'; // Example image
import Df from '../assets/df1.jpg'; 
import Dff from '../assets/df2.jpeg'; 

const products = [
  {
    id: 1,
    name: 'Himalaya Healthy Pet Food - Puppy - Chicken & Rice',
    price: 650,
    image: Df,
  },
  {
    id: 2,
    name: 'Royal Canin Dry Dog Food - Medium Adult',
    price: 750,
    image: Dff,
  },
  {
    id: 3, 
    name: 'Himalaya Healthy Pet Food - Puppy - Chicken & Rice',
    price: 750,
    image: Df,
  },
];

const Shop = () => {
  const [cartCount, setCartCount] = useState(0); // State to keep track of items in the cart

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1); // Increment cart count
  };

  const handleRefresh = () => {
    window.location.reload(); // Refreshes the page
  };

  const handleNext = () => {
    console.log("Next button clicked");
  };

  return (
    <>
      <Navbar />
     
      <section
        className="dog-banner-image"
        style={{ backgroundImage: `url(${DogImage})` }}
      >
        <h1 className="dog-banner-title">DOGS AT CAS</h1>
        <p className="dog-banner-desc">
          They come in all shapes and sizes, with different histories, characters, and disabilities. 
          But they have one thing in common: they are all in need of a helping hand.
        </p>
        <div className="overlay"></div>
      </section>
     
      {/* Cart Icon */}
      <div className="cart-icon" onClick={() => alert(`Items in Cart: ${cartCount}`)}>
        <FaShoppingCart size={30} />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* Show count if > 0 */}
      </div>
      
     
      {/* Product List Section */}
      <section className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </section>

      {/* Refresh and Next Buttons */}
      <div className="button-container">
        <button className="refresh-button" onClick={handleRefresh}>
          Refresh
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>

      <Footer />
    </>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(); // Call the function to update cart count
  };

  return (
    <div className="product-card">
      <div className="image-card">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details-card">
        <h3>{product.name}</h3>
        <p className="price">₹ {product.price}</p>
        <div className="rating">
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
        </div>
        <div className="select-size">
          <label htmlFor={`size-${product.id}`}>Size: </label>
          <select id={`size-${product.id}`} name="size">
            <option value="1kg">1 kg</option>
            <option value="2kg">2 kg</option>
            <option value="5kg">5 kg</option>
          </select>
        </div>
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <div>
          <button className="add-to-cart" onClick={handleAddToCartClick}>Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
