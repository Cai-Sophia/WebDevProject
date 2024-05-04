import './App.css';
import NavBar from "./components/NavBar.jsx";
import HomePage from './components/HomePage.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <NavBar/>
      <HomePage/>
    </div>
  );
}

export default App;
