import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Info from './components/pages/Info';
import Recipes from './components/pages/Recipes';
import useAuth from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <Switch>
      {user.uid ? (
        <>
          <Route exact path="/" component={Recipes} />
          <Route path="/info" component={Info} />
          <Redirect to="/" />
        </>
      ) : (
        <>
          <Route path="/registration" component={Auth} />
          <Route path="/login" component={Auth} />
          <Redirect to="/login" />
        </>
      )}
    </Switch>
  );
}

export default App;
