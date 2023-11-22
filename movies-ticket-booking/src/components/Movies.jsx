import React from 'react'
import Cards from './Cards'
import UpComing from './UpComing';


const Movies = ({movies, upComing}) => {
  return (
    <div>
      <UpComing upComing={upComing}/>
      <Cards movies={movies}/>
    </div>
  )
}

export default Movies