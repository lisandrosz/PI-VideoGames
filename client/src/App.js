import "./App.css";
import { Route } from "react-router-dom";
import VideogameDetails from ".//Components/VideogameDetails";
import CreateVideogame from "./Components/CreateVideogame";
import Home from "./Components/Home";
import Landing from "./Components/Landing";
import NavBar from "./Components/NavBar";

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

      <Route exact path={"/details/:id"} component={NavBar} />
      <Route exact path={"/details/:id"} component={VideogameDetails} />

      <Route exact path={"/creategame"}>
        <NavBar />
        <CreateVideogame />
      </Route>
    </div>
  );
}

export default App;
