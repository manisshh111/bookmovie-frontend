import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const ShowMovieCard = ({movie, cityId}) => {

  const initialFormData = {
    movieId: movie.id|| 0,
    cityId: cityId || 0
  };

  const [showMovieCardFormData, setshowMovieCardFormData] = useState(initialFormData);

  // useEffect(() => {
  //   setFormData({
  //     movieId: movie.movieId || "",
  //     cityId: cityId || ""
  //   });
    
  // }, [movie, cityId]);

  useEffect(()=>{

    console.log(showMovieCardFormData)

  }, []

)

const navigate = useNavigate();
const handleClick = () =>{
    navigate(`/home/movie/${movie.id}`, { state: {showMovieCardFormData} });
}


  return (
    <div onClick={handleClick} className='w-full flex flex-col h-96 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
     <div className='h-5/6 bg-zinc-500'>
     <img src={movie.posterImageUrl} alt={movie.name} className='w-full h-full object-cover' />
     </div>
    
     <div className='flex flex-row gap-16 items-center justify-center bg-black text-white'>
        <p> {movie.duration} minutes</p>
        <p>{movie.rating}/10</p>
     </div>


     <div className='bg-slate-200 text-center'>
        {movie.name}
     </div>

  
    </div>
  )
}

export default ShowMovieCard