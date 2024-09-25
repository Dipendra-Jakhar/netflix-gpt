import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_PHOTO } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img src= {BG_PHOTO} alt="Logo" />
        </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  );
};

export default GptSearch;