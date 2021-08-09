import Simulator from "./components/Simulator";
import Obstruction from "./components/Obstruction";
import "./index.css";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Result from "./components/Result";

function App() {

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path = "/" exact component = {Simulator} />
          <Route path = "/obstruction" exact component = {Obstruction} />
          <Route path = "/output" exact component = {Result} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
