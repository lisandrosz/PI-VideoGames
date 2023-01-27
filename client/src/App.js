import "./App.css";
import { Route } from "react-router-dom";
import VideogameDetails from ".//Components/VideogameDetails";
import CreateVideogame from "./Components/CreateVideogame";
import Home from "./components/Home";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"}>
        <Landing />
      </Route>

      <Route exact path={"/home"}>
        <NavBar />
        <Home />
      </Route>

      <Route exact path={"/details"}>
        <NavBar />
        <VideogameDetails />
      </Route>

      <Route exact path={"/creategame"}>
        <NavBar />
        <CreateVideogame />
      </Route>
    </div>
  );
}

export default App;
