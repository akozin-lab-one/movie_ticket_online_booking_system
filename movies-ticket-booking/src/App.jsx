import React, { useEffect, useState } from 'react'
import './App.css'
import Main from './components/Main'
import { Route, Routes } from 'react-router'
import Movies from './components/Movies'
import { api, upcoming, upcoming_api_key } from './api/apiResource'
import Cinema from './components/cinema/Cinema'
import MovieTime from './components/cinema/MovieTime'
import Navbar from './components/Navbar'
import Footer from './components/Footer';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinema] = useState([]);
    const [cinemaRooms, setCinemaRoom] = useState([]);
    const [cinemaShowDate, setcinemaShowDate] = useState([]);
    const [cinemaSchdule, setcinemaSchdule] = useState([]);
    const [cinemaSeats, setSeat] = useState([]);
    const [cinemaSeatPrice, setcinemaSeatPrice] = useState([]);
    const[upComing, setUpComing] = useState([]);

    const getUpcoming = async () => {
        const res = await upcoming.get(`/movie/upcoming?api_key=${upcoming_api_key}`);
        // console.log(res.data);
        setUpComing(res.data.results);
    };
    useEffect(()=>{getUpcoming()},[])

    const getCinemas = async ()=>{
        const res = await api.get('/Tbl_CinemaList');
        // console.log(res.data);
        setCinema(res.data)
    }

    useEffect(()=>{getCinemas()},[]);
    const getCinemaShowData = async ()=>{
        const res = await api.get('/Tbl_MovieShowDate');
        console.log(res.data);
        setcinemaShowDate(res.data);
    }

    useEffect(()=>{getCinemaShowData()},[])

    const getcinemaRooms = async ()=>{
        const res = await api.get('/Tbl_CinemaRoom');
        console.log(res.data);
        setCinemaRoom(res.data);
    }

    useEffect(()=>{getcinemaRooms()},[]);

    const getMovies = async ()=>{
      const res = await api.get('/Tbl_MovieList');
      console.log(res.data);
      setMovies(res.data);
    }
    useEffect(()=>{getMovies()},[])

    const getMovieSchedule = async ()=>{
        const res = await api.get('/Tbl_MovieSchedule');
        console.log(res.data);
        setcinemaSchdule(res.data);
    }

    useEffect(()=>{getMovieSchedule()},[]);

    const getCinemaSeats = async ()=>{
        const res = await api.get('/Tbl_RoomSeat');
        console.log(res.data);
        setSeat(res.data);
    }

    useEffect(()=>{getCinemaSeats()},[]);

    const getSeatPrice = async ()=>{
        const res = await api.get('/Tbl_SeatPrice');
        console.log(res.data);
        setcinemaSeatPrice(res.data);
    }

    useEffect(()=>{getSeatPrice()},[])
    
    return ( 
        <div> 
            <Navbar/>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/movies' element={<Movies movies={movies} upComing={upComing}/>}/>
                <Route path='/movies/:movieid' element={<Cinema movies={movies} cinemas={cinemas} cinemaRooms={cinemaRooms} cinemaShowDate={cinemaShowDate}/>}/>
                <Route path='/movies/:movieid/cinema/:cinemaid/:roomid' element={<MovieTime movies={movies} cinemas={cinemas} cinemaShowDate={cinemaShowDate} cinemaSchdule={cinemaSchdule} cinemaSeats={cinemaSeats} cinemaSeatPrice={cinemaSeatPrice} />} />
                {/* <Route path='/movies/:movieid/cinema/:cinemaid/:roomid/seat/:seatId/date/:dateId' element={<Ticket movies={movies} cinemas={cinemas} cinemaShowDate={cinemaShowDate} cinemaSchdule={cinemaSchdule} cinemaSeats={cinemaSeats} />} /> */}
            </Routes>
            <Footer/>
        </div>
    )
}

export default App