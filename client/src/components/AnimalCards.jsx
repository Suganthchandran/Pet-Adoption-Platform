import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/AnimalCards.css'

const AnimalCards = ({id,image,name,year}) => {

  return (
    <Link to={`/${id}`} className='animal-item'>
        <div className='animal-item-imagebox'>
            <img className='animal-item-image' src={image} alt={name} />
        </div>
        <p className='animal-item-name'>{name}</p>
        <p className='animal-item-year'>Born in {year}</p>
    </Link>
  )
}

export default AnimalCards
