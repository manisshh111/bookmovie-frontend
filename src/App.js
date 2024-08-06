import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import AddCity from './components/AddCity';
import AddTheatre from './components/AddTheatre';
import AddCategory from './components/AddCategory';
import AddMovie from './components/AddMovie';
import AddScreen from './components/AddScreen';
import AddShow from './components/show/AddShow'
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ShowTheatres from './components/Booking/ShowTheatres';
import SelectSeat from './components/Booking/SelectSeat';
import SeatLayout from './components/Booking/SeatLayout';

function App() {




  return (
    <div className="App">
      <NavBar/>
    <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/admin' element={<AdminDashboard/>} />
    <Route path='/shows' element={<AddShow/>} />
    <Route path='/theatres' element={<AddTheatre/>} />
    <Route path='/movies' element={<AddMovie/>} />
    <Route path='/cities' element={<AddCity/>} />
    <Route path='/categories' element={<AddCategory/>} />
    <Route path='/home/movie/:movie' element={<ShowTheatres/>}/>
    <Route path='/home/movie/book/:showId' element={<SeatLayout/>}/>


    </Routes>
  </div>
  );
}

export default App;
