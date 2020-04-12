import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Info from './components/pages/Info';
import Recipes from './components/pages/Recipes';
import Recipe from './components/pages/Recipe';

function App() {
  return (
    <Switch>
      <Route path="/registration" component={Auth} />
      <Route path="/login" component={Auth} />
      <Route exact path="/" component={Recipes} />
      <Route path="/info" component={Info} />
      <Route path="/:id" component={Recipe} />
    </Switch>
  );
}

export default App;
