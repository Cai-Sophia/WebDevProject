import './App.css';
import NavBar from "./components/NavBar.jsx";
import HomePage from './components/HomePage.jsx';
import Search from './components/Search.jsx';
import SimilarGames from './components/Similar.jsx';
import FPSPage from './components/FPSPage.jsx';
import PuzzlePage from './components/PuzzlePage.jsx';
import RacingPage from './components/RacingPage.jsx';
import PlatformPage from './components/PlatformPage.jsx';
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
          <Route path="/fps" element={<FPSPage />} />
          <Route path="/puzzle" element={<PuzzlePage />} />
          <Route path="/racing" element={<RacingPage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
