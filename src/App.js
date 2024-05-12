import './App.css';
import NavBar from "./components/NavBar.jsx";
import HomePage from './components/HomePage.jsx';
import Search from './components/Search.jsx';
import SimilarGames from './components/Similar.jsx';
import Favorites from './components/Favorites.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:term" element={<Search />} />
          <Route path="/similar-games/:gameId" element={<SimilarGames />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
