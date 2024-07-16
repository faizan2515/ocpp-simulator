import { hot } from 'react-hot-loader/root';

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from 'screens/Dashboard';
import Docs from 'screens/Docs';
import NotFound from 'screens/NotFound';

const App = () => {
  // const { loading, error } = useSession();
  // if (loading) {
  //   return <Loading />;
  // } else if (error) {
  //   return <Error error={error} />;
  // }
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/docs" component={Docs} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default hot(App);
