import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../src/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [animals, setAnimals] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartItems,setCartItems] = useState({});
    // const navigate = useNavigate();

    const addToCart = async (itemId,size) => {
        let cardData = structuredClone(cartItems);

        if(!size) {
            toast.error('Please Select the Size');
            return;
        }

        if(cardData[itemId]) {
            if(cardData[itemId][size]) {
                cardData[itemId][size] += 1;
            }
            else {
                cardData[itemId][size] = 1;
            }
        }
        else {
            cardData[itemId] = {};
            cardData[itemId][size] = 1;
        }
        setCartItems(cardData);
        console.log(cartItems);
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

    useEffect(() => {
        fetchUserData();
        fetchAnimalsData();
        fetchProductData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, animals, products, handleLogout, userDetails, addToCart}}>
            {children}
        </UserContext.Provider>
    );
}
