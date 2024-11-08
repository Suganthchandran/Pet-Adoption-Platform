import React, { useContext, useState } from 'react';
import '../styles/Shop.css';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'

const Shop = () => {
  const [cartCount, setCartCount] = useState(0); 

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1); 
  };

  const handleRefresh = () => {
    window.location.reload(); 
  };

  const handleNext = () => {
    console.log("Next button clicked");
  };

  const { products } = useContext(UserContext);

  return (
    <>
      <Navbar />

      <section
        className="dog-banner-image"
        style={{ backgroundImage: `url(${assets.shop})` }}
      >
        <h1 className="dog-banner-title">SHOPS AT CAS</h1>
        <p className="dog-banner-desc">
          They come in all shapes and sizes, with different histories, characters, and disabilities.
          But they have one thing in common: they are all in need of a helping hand.
        </p>
        <div className="overlay"></div>
      </section>

      <section className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </section>

      <div className="button-container">
        <button className="refresh-button" onClick={handleRefresh}>
          Refresh
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
      <Footer/>
    </>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]); 

  const { addToCart, user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); 
  };

  const handleAddToCartClick = () => {
    if(!user || !user.uid) {
      toast.error("Log in to add to Cart");
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    onAddToCart();
    addToCart(product._id, selectedSize, quantity); 
  };

  const handleBuyNow = () => {
    if(!user || !user.uid) {
      toast.error("Log in to add to Cart");
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    handleAddToCartClick();
    navigate('/place-order')
  }

  return (
    <div className="product-card">
      <div className="image-card">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details-card">
        <h3>{product.name}</h3>
        <p className="price">₹ {product.price}</p>
        <div className="rating">
          {Array(product.star).fill('★').map((star, index) => (
            <span key={index} className="star">{star}</span>
          ))}
        </div>

        <div className="select-size">
          <label htmlFor={`size-${product._id}`}>Size: </label>
          <select id={`size-${product._id}`} name="size" value={selectedSize} onChange={handleSizeChange}>
            {product.sizes.map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <div>
          <button className="add-to-cart" onClick={handleAddToCartClick}>Add to Cart</button>
          <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
