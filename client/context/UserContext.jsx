import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../src/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const currency = '$';
    const delivery_fee = 30;
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [animals, setAnimals] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const navigate = useNavigate();

    const addToCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);
      
        if (!size) {
            toast.error('Please Select the Size');
            return;
        }
    
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment the quantity for that size
            } else {
                cartData[itemId][size] = 1; // Add the size with a quantity of 1
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }
    
        setCartItems(cartData);
        localStorage.setItem('cartItems', JSON.stringify(cartData)); // Persist cart to localStorage
    };
    
    

    const getCartCount = () => {
        let totalCount = 0;

        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                }
                catch(error) {

                }
            }
        }
        return totalCount;
    }

    useEffect(() => {
        if (!user) {
            axios.get('/api/auth/profile').then(({ data }) => {
                setUser(data);
                console.log('User Profile:', data);
            });
        }
    }, [user]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (savedCart) {
            setCartItems(savedCart);
        }
    }, []);
    

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log('Firebase User:', user);
            if (user) {
                const token = await user.getIdToken(); 
                localStorage.setItem('authToken', token);
                const docRef = doc(db, 'Users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log('User Details:', docSnap.data());
                } else {
                    console.log('User data not found');
                }
                setUser(user)
                console.log("User for Order Maintenance should be : ",user.uid)
            }
        });
    };
    

    const fetchProductData = async () => {
        try {
            const response = await axios.get('/api/product');
            setProducts(response.data);
            console.log('Product Data: ',response.data);
        }
        catch(error) {
            console.error('Error fetching products:',error);
        }
    }

    const fetchAnimalsData = async () => {
        try {
            const response = await axios.get('/api/animal');
            setAnimals(response.data);
            console.log('Animals Data:', response.data);
        } catch (error) {
            console.error('Error fetching animals:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.href = '/login';
            toast.success('User logged out successfully');
        } catch (error) {
            toast.error('Error logging out:', error.message);
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = { ...cartItems }; // Ensure new object reference for state change
    
        if (quantity > 0) {
            cartData[itemId] = {
                ...cartData[itemId],
                [size]: quantity,
            };
        } else {
            // Remove the size if quantity is zero to clean up the cart
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]; // Remove the item if all sizes are zero
            }
        }
    
        setCartItems(cartData);
        localStorage.setItem('cartItems', JSON.stringify(cartData)); // Persist changes
    
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.error('Token not available. Please log in.');
                return;
            }
    
            await axios.post('http://localhost:8086/api/cart/update', { itemId, size, quantity }, {
                headers: { token }
            });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    

    const getUserCart = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.error('Token not available. Please log in again.');
                return;
            }
            const response = await axios.post('http://localhost:8086/api/cart/get', {}, {
                headers: { token }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Error calculating cart amount:", error);
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        fetchUserData();
        fetchAnimalsData();
        fetchProductData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, animals, products,navigate,token: localStorage.getItem('authToken'), handleLogout, userDetails, addToCart, cartItems,setCartItems, updateQuantity, currency, delivery_fee,getUserCart, getCartAmount, getCartCount}}>
            {children}
        </UserContext.Provider>
    );
}
