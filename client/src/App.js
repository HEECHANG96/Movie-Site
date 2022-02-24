//import logo from './logo.svg';
import '../src/App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';

import LoginPage from './components/views/LoginPage/LoginPage';

import RegisterPage from './components/views/RegisterPage/RegisterPage';

import MovieDetail from './components/views/MovieDetail/MovieDetail';

function App() {
  return (
    <Router>

    <Routes>
    <Route exact path="/" element = {<LandingPage />}/>
    <Route exact path="/login" element = {<LoginPage />}/>
    <Route exact path="/register" element = {<RegisterPage />}/>
    <Route exact path="/movie/:movieId" element = {<MovieDetail />}/>
    </Routes>

    </Router>
  ); 
}

export default App;


