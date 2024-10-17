import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { assets } from '../assets/assets';

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <img src={assets.login_image} />
        </div>
    );
};

export default Home;
