import React from 'react'
import { INFO_ICON, PLAY_ICON } from '../utlils/constants'

const VideoTitle = ({title , overview}) => {
  return (
    <div className='pt-[12rem] px-10 absolute md:px-24 w-screen aspect-video text-white bg-gradient-to-r from-black'>
        <h1 className=' font-bold md:text-6xl'>{title}</h1>
        <p className='w-1/3 py-5 '>{overview}</p>
        <div className='flex gap-5'>
            <div className='flex border border-transparent bg-gray-400 py-3 px-5 rounded-lg text-white gap-1 bg-opacity-50'>
            <img className='h-10' src={PLAY_ICON} alt="" /> 
            <button className='text-2xl' >Play</button>
            </div>
            <div className='flex border border-transparent bg-gray-400 py-3 px-5 rounded-lg text-white gap-1 bg-opacity-50'>
                <img className='h-9 pt-2' src={INFO_ICON} alt="" />
            <button className='text-2xl'>More Info</button>
            </div>
        </div>
    </div>
  )
}

export default VideoTitle