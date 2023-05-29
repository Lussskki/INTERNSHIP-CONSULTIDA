import React, { useState, useEffect } from "react";
import api from '../../api'
import {  toast } from 'react-toastify';

function StarRating({id, done, rate}){
  const [rating, setRating] = useState(rate ? rate : 0);
  const [ratingClick, setRatingClick] = useState(0)

  const onRate = async (rate) => {
    try {
      const rateData = await api.rateAppointment(id, rate)
    } catch (error) {
      console.log(error);
    }
  };

  function setRate(index) {
    if(rate){
      toast('You have already rated!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: 'fancy-progress-consultida'
      });      
    }
    else {
      setRatingClick(index)
      if(index === 1 && ratingClick === 1) {
        setRating(0)
        onRate(index)
        setRatingClick(0)
      }
      else if(index === 1 && ratingClick === 0) {
        setRating(index)
        onRate(index)
      }
      else {
        setRating(index)
        onRate(index)
      }
      toast('You have successfully voted!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: 'fancy-progress-consultida'
      });      
    }
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            disabled={done}
            className={`ratingButton ${index <= rating ? "on" : "off"}`}
            onClick={() => setRate(index)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;