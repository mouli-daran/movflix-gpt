import React from 'react'
import { IMG_CDN_URL } from '../utlils/constants';

const MovieCard = ({posterpath}) => {
  if(!posterpath) return null;
  return (
    <div className='w-36 md:w-48 pr-4 hover:scale-95 cursor-pointer'>
      <img src={IMG_CDN_URL + posterpath} alt="Movie card logo" />
    </div>
  )
}

export default MovieCard;