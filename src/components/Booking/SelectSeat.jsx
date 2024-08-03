import React from 'react'
import { useLocation } from 'react-router-dom';

const SelectSeat = () => {
    const location = useLocation();
    const showMovieCardFormData = location.state?.show;

  return (
    <div>{showMovieCardFormData.showId}</div>
   
  )
}

export default SelectSeat