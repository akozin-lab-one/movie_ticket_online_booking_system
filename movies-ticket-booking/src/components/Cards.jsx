import React from "react";
import { NavLink } from "react-router-dom";

const Cards = ({ movies }) => {
  if (JSON.stringify(movies) !== "[]") {
    return (
      <div className="lg:w-[75%] md:w-[85%] sm:w-[70%] w-[70%] mx-auto grid lg:grid-cols-5 lg:gap-y-0 lg:gap-x-2 md:grid-cols-4 md:gap-y-3 md:gap-x-2 sm:grid-cols-3 sm:gap-y-6 sm:gap-x-2 grid-cols-2 gap-y-4 gap-x-2 ">
        {Array.isArray(movies)
          ? movies.map((movie) => {
              // const result = movie.MovieTitle.length > 22 ? movie.MovieTitle.split(0,22) : movie.MovieTitle;
              // console.log(result)
              return [
                <NavLink to={`/movies/${movie.MovieId}`}>
                  <div
                    key={movie.MovieId}
                    className="lg:w-[100%] lg:h-[95%] md:w-[100%] md:h-[99%] sm:w-[100%] sm:h-[95%] w-[100%] h-[95%] drop-shadow-lg cursor-pointer bg-gray-300 rounded-lg"
                  >
                    <img
                      className="lg:w-[100%] lg:h-[90%] w-[100%] h-[90%] rounded-t-lg"
                      src={movie.MoviePhoto}
                      alt=""
                    />
                    <h5 className="text-xs text-black font-bold text-center">
                      {movie.MovieTitle}
                    </h5>
                  </div>
                </NavLink>,
              ];
            })
          : ""}
      </div>
    );
  }
};

export default Cards;
