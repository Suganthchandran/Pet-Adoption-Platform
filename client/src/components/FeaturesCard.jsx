import React from 'react'
import '../styles/FeaturesCard.css'
import { assets } from '../assets/assets'
import Button from './Button'

const FeaturesCard = ({image,title,desc}) => {
  return (
    <div className='feature-card'>  
        <div className='feature-card-image-container'>
            <img className='feature-card-image' src={image} />
        </div>
        <h1 className='feature-card-title'>{title}</h1>
        <h1 className='feature-card-desc'>{desc}</h1>
        <div>
            <Button name={'Learn More'} />
        </div>
    </div>
  )
}

export default FeaturesCard
