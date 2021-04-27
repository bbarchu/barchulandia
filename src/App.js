import logo from "./logo.svg";
import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Barchulandia</p>
      </header>
      <Router>
        <ul>
          <li>
            <Link to="/sistemaSolar">Sistema solar</Link>
          </li>
          <li>
            <Link to="/letras1">Demo letras - ej1</Link>
          </li>
          <li>
            <Link to="/letras2">Demo letras - ej2</Link>
          </li>
        </ul>

        <Switch>
          <Route
            path="/sistemaSolar"
            render={() => {
              window.location.href = "ejercicioSistemaSolar/sistemaSolar.html";
            }}
          />
          <Route
            path="/letras1"
            render={() => {
              window.location.href = "demoLetras3D/ejercicio1.html";
            }}
          />
          <Route
            path="/letras2"
            render={() => {
              window.location.href = "demoLetras3D/ejercicio2.html";
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
