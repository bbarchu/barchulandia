import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Barchulandia</p>
        <a className="App-link" href="/sistemaSolar">
          Sistema solar
        </a>
        <a className="App-link" href="/letras1">
          Demo letras - ej1
        </a>
        <a className="App-link" href="/letras2">
          Demo letras - ej2
        </a>
      </header>
      <Router>
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
