import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/router'
import React from 'react'
import ReactPlayer from 'react-player/youtube'

import { AiOutlineArrowLeft } from "react-icons/ai";
import YouTube from 'react-youtube';


const Watch = () => {
    const router = useRouter()
    const { movieId } = router.query
    const { data } = useMovie(movieId as string)
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }}
  
    
    return (
        <div className='h-screen w-screen bg-black'>
            <nav className='
                fixed
                w-full
                p-4
                z-10
                flex
                flex-row
                items-center
                gap-8
                bg-black
                bg-opacity-70
            '>
                <AiOutlineArrowLeft
                    onClick={() => router.push('/')}
                    className="text-white" size={30} />
                <p className='text-white text-1xl md:text-3xl font-bold'>
                    <span className='font-light'>Watching: </span>
                    {data?.title}
                </p>
            </nav>
             <YouTube videoId="2g811Eo7K8U" opts={opts} /> 
        </div>)
}

export default Watch