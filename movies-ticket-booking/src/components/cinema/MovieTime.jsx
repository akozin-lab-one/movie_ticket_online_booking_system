import React, { useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

const MovieTime = ({
  movies,
  cinemas,
  cinemaShowDate,
  cinemaSchdule,
  cinemaSeats,
  cinemaSeatPrice,
}) => {
  const Id = useParams();

  const [isTimeBoxOpen, setIsTimeBoxOpen] = useState(false);
  const [isTicketBoxOpen, setIsTicketBoxOpen] = useState(false);
  const [isSeatBoxOpen, setIsSeatBoxOpen] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [checkSeat, setSeatNo] = useState([]);
  const [currentDiv, setCurrentDiv] = useState([]);
  const [showSeat, setShowSeat] = useState(false);
  const [showTime, setShowTime] = useState("");
  // const [seatPrice, setSeatPrice] = useState([]);

  const openModal = () => {
    setIsTimeBoxOpen(true);
  };

  const opeanSeatsModal = () => {
    setIsSeatBoxOpen(true);
  };

  const closeModal = () => {
    setIsTimeBoxOpen(false);
  };

  const seatCloseModal = () => {
    setIsSeatBoxOpen(false);
  };

  const handleClick = (Id) => {
    if (currentDiv.includes(Id)) {
      setCurrentDiv(currentDiv.filter((div) => div !== Id));
      alert(showSeat);
    } else {
      setCurrentDiv([...currentDiv, Id]);
      setShowSeat(true);
      const choosedSeat = currentDiv.map((div) => div);

      const resultSeat = cinemaSeats.filter((seat) =>
        choosedSeat.includes(seat.SeatId)
      );
      console.log(resultSeat);
      setSeatNo(resultSeat);
    }
  };

  const postData = () => {
    setIsTicketBoxOpen(true);
    // api.post('/Tbl_TicketReceive',{  
    //     "CustomerName": "Maung Maung",
    //     "MovieName": "The Num"
    // }).then(res=>console.log(res))
    // .catch(err=>console.log(err))
    console.log("loading");
  };
  // useEffect(()=>{postData()},[])

  const TicketCloseModal = () => {
    setIsTicketBoxOpen(false);
  };

  if (
    JSON.stringify(movies) !== "[]" &&
    JSON.stringify(cinemaShowDate) !== "[]" &&
    JSON.stringify(cinemas) !== "[]" &&
    JSON.stringify(cinemaSeats) !== "[]" &&
    JSON.stringify(cinemaSeatPrice !== "[]")
  ) {
    const cinema = cinemas.filter(
      (cinema) => cinema.CinemaId === parseInt(Id.cinemaid)
    );
    console.log(cinema);
    const movie = movies.filter(
      (movie) => movie.MovieId === parseInt(Id.movieid)
    );
    console.log(movie);
    const resultTime = cinemaShowDate.filter(
      (showdate) =>
        showdate.MovieId === parseInt(Id.movieid) &&
        showdate.CinemaId === parseInt(Id.cinemaid)
    );
    console.log(resultTime);
    const Oneresult = cinemaSchdule.filter(
      (schdule) =>
        schdule.ShowDateId === resultTime[resultTime.length - 1].ShowDateId
    );
    console.log(Oneresult);
    const resultMovie = movies.filter(
      (movie) => movie.MovieId === parseInt(Id.movieid)
    );

    const getDateId = (Time) => {
      setShowTime(Time);
      setClicked(true);
      setIsTimeBoxOpen(false);
    };

    

    const getSeats = cinemaSeats.filter(
      (seat) => seat.RoomId === parseInt(Id.roomid)
    );
    console.log(getSeats);

    const seatPrices = checkSeat.map((chSeat) => {
      return cinemaSeatPrice.filter(
        (ciSeatPrice) =>
          ciSeatPrice.RowName === chSeat.RowName &&
          ciSeatPrice.RoomId === chSeat.RoomId
      );
    });

    console.log(seatPrices[seatPrices.length - 1]);

      // useEffect(()=>{postData()},[])

    return (
      <div className="w-[85%] h-screen grid place-items-center mx-auto">
        <div className="w-[100%] lg:w-[75%] grid grid-cols-1 gap-2 lg:flex">
          <div className="w-[250px]  grid place-items-center">
          <div className="">
            <img
              className="mx-auto drop-shadow-xl w-[115px] lg:w-auto"
              src={resultMovie[resultMovie.length - 1].MoviePhoto}
              alt=""
            />
            <p className="text-center bg-black text-white">
              <i class="fa-solid fa-clock mr-2"></i>
              {resultMovie[resultMovie.length - 1].Duration}
            </p>
            <NavLink to={`/movies/${Id.movieid}`}>
              <p className="text-center bg-black text-white mt-2">Back</p>
            </NavLink>
          </div>
          </div>
          <div className="w-[100%] lg:w-[80%] lg:ml-3 mx-auto ">
            <h3 className="text-center font-extrabold">Movie Ticket Detail</h3>
            <div className="w-[100%] grid place-items-center">
              <div className="w-[100%] flex">
                <div className="w-[80%] border border-r-0 pl-2 rounded-lg  py-2">
                  <div className="flex">
                    <p>name</p> <span className="ml-12">:</span>
                  </div>
                  <div className="flex">
                    <p>duration</p> <span className="ml-7">:</span>
                  </div>
                  <div className="flex">
                    <p>cinema </p> <span className="ml-9">:</span>
                  </div>
                  <div className="flex my-1">
                    <p>showdate</p> <span className="ml-5">:</span>
                  </div>
                  <div className="flex">
                    <p>seat</p> <span className="ml-[58px]">:</span>
                  </div>
                </div>
                <div className=" w-[80%] border border-l-0 py-2 rounded-lg">
                  <p className="text-sm text-black">{movie[movie.length - 1].MovieTitle}</p>
                  <p className="text-sm text-black">{resultMovie[resultMovie.length - 1].Duration}</p>
                  <p className="text-sm text-black">{cinema[cinema.length - 1].CinemaName}</p>
                  <p
                    onClick={() => openModal()}
                    className={
                      isClicked
                        ? "cursor-pointer my-4"
                        : "bg-black text-white text-xs w-[100%] lg:w-[53%] text-center p-1 rounded-lg drop-shadow-lg cursor-pointer my-3"
                    }
                  >
                    {isClicked ? showTime.slice(0,10) : "pick a showdate"}
                  </p>
                  <p
                    onClick={() => opeanSeatsModal()}
                    className={
                      showSeat
                        ? "cursor-pointer my-3"
                        : "bg-black text-white w-[100%] lg:w-[50%] text-center p-1 text-xs rounded-lg drop-shadow-lg cursor-pointer mb-2 my-3"
                    }
                  >
                    {showSeat
                      ? checkSeat.map((seat, index) => {
                          return [
                            <ul className="inline-block">
                              <li>
                              <React.Fragment key={index}>
                              {index > 0 && ', '}
                                {seat.RowName}
                                {seat.SeatNo}
                              </React.Fragment>
                              </li>
                            </ul>,
                          ];
                        })
                      : "choose your seat"}
                  </p>
                </div>
                {isTimeBoxOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-container h-96 bg-white w-[85%] rounded shadow-lg p-4 z-50">
                      <h2 className="text-center text-xl font-extrabold">
                        MovieSchdule
                      </h2>
                      <div className="rounded-lg drop-shadow-sm w-[95%] lg:w-[85%] h-[75%] mx-auto grid grid-cols-2 gap-x-1 lg:grid-cols-4 lg:gap-x-2 p-2 border lg:gap-y-2">
                        {Oneresult.map((res) => {
                          return [
                            <div
                              onClick={() => {
                                getDateId(res.ShowDateTime);
                              }}
                              className="bg-gray-700 h-[100px] cursor-pointer text-white text-sm lg:text-base rounded-lg grid place-items-center"
                            >
                              {res.ShowDateTime.slice(0, 10)} <br />
                              {res.ShowDateTime.slice(
                                12,
                                res.ShowDateTime.length
                              )}
                            </div>,
                          ];
                        })}
                      </div>
                      <div className="text-center">
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

                {isSeatBoxOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-container  bg-white w-[100%] lg:w-[87%] h-[98%] rounded shadow-lg p-4 z-50">
                      <h2 className="text-center text-xl font-extrabold">
                        Choose Your Seat
                      </h2>
                      <div className="rounded-lg drop-shadow-sm w-[100%] lg:w-[92%] h-[90%] mx-auto overflow-auto p-2 border grid grid-cols-6 gap-y-1 lg:grid-cols-11 lg:gap-1">
                        {getSeats.map((seat) => {
                          return [
                            <div
                              key={seat.SeatId}
                              onClick={() => {
                                handleClick(seat.SeatId);
                              }}
                              className={`lg:h-[30px] w-[40px] lg:w-[80px] cursor-pointer text-xs lg:text-base text-white rounded-lg grid place-items-center ${
                                currentDiv.includes(seat.SeatId)
                                  ? "bg-blue-700"
                                  : "bg-gray-700"
                              }`}
                            >
                              {seat.RowName} {seat.SeatNo}
                            </div>,
                          ];
                        })}
                      </div>
                      <div className="text-center">
                        <button
                          className="text-red-500 hover:text-red-700 cursor-pointer mt-2"
                          onClick={seatCloseModal}
                        >
                          နောက်သို့
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[80%] ml-3 text-right mt-2">
              <button
                onClick={() => {
                  postData();
                }}
                className="bg-black text-white w-[53%] text-center p-1 text-sm rounded-lg drop-shadow-lg cursor-pointer mb-2"
                type="button"
              >
                proceed
              </button>

              {isTicketBoxOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="modal-container  bg-white w-[80%] h-[92%] lg:w-[50%] lg:h-[92%] rounded shadow-lg p-4 z-50">
                    <h2 className="text-center text-xl font-extrabold">
                      Tickets
                    </h2>
                    <div className="rounded-lg drop-shadow-sm w-[80%] h-[90%] lg:w-[50%] lg:h-[90%] mx-auto  p-2 border">
                      <h1 className="text-xl bg-black text-white font-extrabold w-[100%] text-center lg:mt-12 mt-3">
                        {cinema[cinema.length - 1].CinemaName}
                      </h1>
                      <div className="flex justify-between">
                        <p className="text-center">{showTime.slice(0, 10)}</p>
                        <p className="text-center">
                          {showTime.slice(11, showTime.length)}
                        </p>
                      </div>

                      <p className="text-center lg:mt-10 mt-4">NAME</p>
                      <h5 className="text-center font-bold">
                        {movie[movie.length - 1].MovieTitle}
                      </h5>

                      <p className="text-center lg:mt-12 mt-4">SEAT</p>
                      <h5 className="text-center font-bold">
                        {checkSeat.map((seat, index) => {
                          return [
                            <ul className="inline-block">
                              <li>
                              <React.Fragment key={index}>
                              {index > 0 && ', '}
                                {seat.RowName}
                                {seat.SeatNo}
                              </React.Fragment>
                              </li>
                            </ul>,
                          ];
                        })}
                      </h5>

                      <p className="text-center lg:mt-12 mt-4">DURATION</p>
                      <h5 className="text-center font-bold">
                        {resultMovie[resultMovie.length - 1].Duration}
                      </h5>

                      <p className="text-center lg:mt-12 mt-4">PRICE</p>
                      <h5 className="text-center font-bold">
                        {seatPrices.length > 1
                          ? seatPrices[seatPrices.length - 1].map(
                              (arr) => arr.SeatPrice * seatPrices.length
                            )
                          : seatPrices[seatPrices.length - 1].map(
                              (arr) => arr.SeatPrice
                            )}
                      </h5>
                    </div>
                    <div className="text-center">
                      <button
                        className="text-red-500 hover:text-red-700 cursor-pointer mt-1"
                        onClick={TicketCloseModal}
                      >
                        နောက်သို့
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieTime;
