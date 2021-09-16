
import '../css/App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Recipes, NewRecipe} from './pages/Recipes.js';
import {ShoppingList} from './pages/ShoppingLists';
import React from 'react';
import {RecipeCardPage} from './pages/RecipeCardPage';

export default function App() {

  let [target, setTarget] = React.useState(null); 
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          
          <Route path="/newRecipe">
            <NewRecipe/>
          </Route>
          <Route path="/shoppingList">
            <ShoppingList list={"shopping list"}/>
          </Route>
          <Route path="/defaultList">
            <ShoppingList list={"default"}/>
          </Route>
          <Route path="/recipeCard">
            <RecipeCardPage item={target}/>
          </Route>
          <Route path="/">
            <Recipes targetSetter={setTarget}></Recipes>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}
