import React from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Cinema = ({ movies, cinemas, cinemaRooms, cinemaShowDate }) => {
  const movieId = useParams();
  console.log(movieId.movieid);
  console.log(cinemas);

  const [cinemaRoomBox, setCinemaRoomBox] = useState(false);
  const [result, setResult] = useState([]);

  if (
    JSON.stringify(movies) !== "[]" &&
    JSON.stringify(cinemas) !== "[]" &&
    JSON.stringify(cinemaRooms) !== "[]" &&
    JSON.stringify(cinemaShowDate) !== "[]"
  ) {
    const cinemaShow = cinemaShowDate.filter(
      (cinema) => cinema.MovieId === parseInt(movieId.movieid)
    );
    console.log(cinemaShow);
    const resCinema = cinemaShow.filter(
      (cinema) => cinema.cinemaId === cinemas.CinemaId
    );

    const resultOnce = [...new Set(resCinema.map((item) => item.CinemaId))];

    console.log(resultOnce);

    const resList = resultOnce.map((number) => {
      // console.log(number);
      return cinemas.filter((cinema) => cinema.CinemaId === number);
      // console.log(res);
    });
    console.log(resList[resList.length -1][resList[resList.length -1].length - 1].CinemaLocation.slice(0,18));
    console.log(resList[resList.length -1][resList[resList.length -1].length - 1].CinemaLocation.slice(20,resList[resList.length -1][resList[resList.length -1].length - 1].CinemaLocation.length));
    // console.log(resList[resList.length -1]);

    const getCinemaId = (Id) => {
      console.log(Id);
      setCinemaRoomBox(true);
      const Rooms = cinemaRooms.filter((room) => room.CinemaId === Id);
      console.log(Rooms);
      setResult(Rooms);
    };

    const closeModal = () => {
      setCinemaRoomBox(false);
    };
    const movieData = Array.isArray(movies)
      ? movies.filter((movie) => movie.MovieId === parseInt(movieId.movieid))
      : "";
    // console.log(movieData[movieData.length - 1]);
    return (
      <div className="">
        <div className="w-[90%] mx-auto grid place-items-center h-screen ">
          <div className="grid grid-cols-1 gap-2 lg:flex w-[100%] h-[80%] justify-center ">
            <div className="lg:w-[250px] grid lg:place-items-center">
              <div className=" ">
                <img
                  className="mx-auto drop-shadow-xl w-[105px] lg:w-auto"
                  src={movieData[movieData.length - 1].MoviePhoto}
                  alt=""
                />
                <p className="text-center bg-black text-white w-[37%] lg:w-auto mx-auto">
                  <i class="fa-solid fa-clock"></i>
                  {movieData[movieData.length - 1].Duration}
                </p>
                <NavLink to="/movies">
                  <p className="text-center bg-black text-white mt-2 w-[42.5%] lg:w-auto mx-auto">Back</p>
                </NavLink>
              </div>
            </div>
            <div className="w-[100%] lg:w-[50%] lg:grid lg:place-items-center">
              <div className="bg-gray-200 p-8 border drop-shadow-lg rounded-xl">
                <h3 className="text-base lg:text-3xl font-extrabold">
                  Avabilable in Now!!!
                </h3>
                <ul>
                  {resList.map((cinema) => {
                    return [
                      <li
                        key={cinema[cinema.length - 1].CinemaId}
                        onClick={() => {
                          getCinemaId(cinema[cinema.length - 1].CinemaId);
                        }}
                        className="cursor-pointer text-sm lg:text-base"
                      >
                        {cinema[cinema.length - 1].CinemaName} |
                        <a href={`https://www.google.com/maps/search/?api=1&query=${cinema[cinema.length - 1].CinemaLocation.slice(0,18)},${cinema[cinema.length - 1].CinemaLocation.slice(20,cinema[cinema.length - 1].CinemaLocation.length)}`} target="_blank" rel="noopener noreferrer">
                            <i class="fa-solid fa-map-location-dot ml-3"></i>
                        </a>
                      </li>,
                    ];
                  })}
                </ul>
              </div>
              {/* <div className="flex justify-evenly w-[70%]">
                  <div className="bg-black cursor-pointer text-white w-[20%] py-2 rounded-lg text-center">
                    time
                  </div>
                  <div className="bg-black cursor-pointer text-white w-[20%] py-2 rounded-lg text-center">
                    seat
                  </div>
              </div> */}
            </div>
          </div>
        </div>
        {cinemaRoomBox && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-container h-96 bg-white w-[75%] rounded shadow-lg p-4 z-50">
              <h2 className="text-center text-xl font-extrabold">
                CinemaRooms
              </h2>
              <div className="rounded-lg drop-shadow-sm w-[90%] h-[75%] mx-auto grid grid-cols-2 gap-x-2 gap-y-2 lg:grid-cols-4 lg:gap-x-2 p-2 border lg:gap-y-2">
                {result.map((res) => {
                                      // console.log(res);
                  return [
                    <NavLink className='bg-gray-700 cursor-pointer text-white text-xs lg:text-base rounded-lg grid place-items-center' to={`/movies/${movieId.movieid}/cinema/${res.CinemaId}/${res.RoomId}`}>
                      {/* <div className="bg-gray-700 cursor-pointer text-white rounded-lg grid place-items-center"> */}
                        {res.RoomName}
                      {/* </div> */}
                    </NavLink>
                  ];
                })}
              </div>
              <div className="text-right mr-3">
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer my-5"
                  onClick={closeModal}
                >
                  နောက်သို့
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Cinema;
