import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import Footer from '../components/Footer';

const Verify = () => {
    const { navigate, token, setCartItems } = useContext(UserContext);
    const [searchParams] = useSearchParams();

    const {user} = useContext(UserContext);

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    
    const verifyPayment = async () => {

        if(!user || !user.uid) {
            navigate('/');
        }

        try {
            if (!token || !success || !orderId) {
                return;
            }

            const response = await axios.post(
                'http://localhost:8086/api/orders/verifyStripe', 
                { success, orderId },
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems({});
                toast.success('Payment successful! Redirecting to your orders...');
                navigate('/orders');
            } else {
                toast.error('Payment verification failed. Please try again.');
                navigate('/cart');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while verifying the payment.');
            navigate('/cart');
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token, success, orderId]);

    return (
        <div>
            Verifying payment...
            <Footer/>
        </div>
    );
};

export default Verify;
