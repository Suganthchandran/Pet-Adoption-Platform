import React from 'react'
import '../styles/Features.css'
import { assets } from '../assets/assets'
import FeaturesCard from './FeaturesCard'

const Features = () => {

    const Feature = assets.features

  return (
    <div className='feature'>
      <div className='feature-title'>
        <h1>Planning to adopt a pet?</h1>
      </div>
      <div className='feature-content'>
      {
        Feature.map((item,index)=> (
            <FeaturesCard key={index} image={item.image} title={item.title} desc={item.desc} />
        ))
      }
      </div>
    </div>
  )
}

export default Features
