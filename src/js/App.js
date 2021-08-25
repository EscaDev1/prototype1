
import '../css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import Recipes from './pages/Recipes.js'

export default function App() {
  return (
    <Router>
      <div>
        <Recipes></Recipes>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/recipes">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
