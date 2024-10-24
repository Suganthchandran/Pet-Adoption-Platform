import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../src/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const currency = '$';
    const delivery_fee = 30;
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [animals, setAnimals] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        // Retrieve cart from localStorage on initial load
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    // const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
      
        if (!size) {
          toast.error('Please Select the Size');
          return;
        }

        if (cartData[itemId]) {
          if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
          } else {
            cartData[itemId][size] = 1;
          }
        } else {
          cartData[itemId] = { [size]: 1 };
        }

        setCartItems(cartData);
        localStorage.setItem('cartItems', JSON.stringify(cartData)); // Persist cart to localStorage
        console.log("Cart Items:", cartItems);
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

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log('Firebase User:', user);
            if (user) {
                const docRef = doc(db, 'Users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log('User Details:', docSnap.data());
                } else {
                    console.log('User data not found');
                }
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

    const updateQuantity = async (itemId,size,quantity)=> {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
        localStorage.setItem('cartItems', JSON.stringify(cartData)); 
    }

    const getCartAmount =  ()=> {
        let totalAmount = 0;

        for(const items in cartItems) {
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
                catch(error) {

                }
            } 
        }
        return totalAmount;
    }

    useEffect(() => {
        fetchUserData();
        fetchAnimalsData();
        fetchProductData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, animals, products, handleLogout, userDetails, addToCart, cartItems, updateQuantity, currency, delivery_fee, getCartAmount, getCartCount}}>
            {children}
        </UserContext.Provider>
    );
}
