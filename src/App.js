import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Info from './components/pages/Info';
import Recipes from './components/pages/Recipes';
import Recipe from './components/pages/Recipe';
import useAuth from './hooks/useAuth';

function App() {
  const { checkUserSession } = useAuth();

  React.useEffect(() => {
    const unsubscribe = checkUserSession();

    return () => unsubscribe && unsubscribe();
  }, [checkUserSession]);

  return (
    <Switch>
      <Route exact path="/" component={Recipes} />
      <Route path="/registration" component={Auth} />
      <Route path="/login" component={Auth} />
      <Route path="/info" component={Info} />
      <Route path="/recipes/:id" component={Recipe} />
    </Switch>
  );
}

export default App;
