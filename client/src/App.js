import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Menus from './components/menus/Menus';
import Menu from './components/menu/Menu';
import PrivateRoute from './components/routing/PrivateRoute';
import { ModalProvider } from 'react-modal-hook';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ModalProvider>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <section className=''>
              <Alert />
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/menus' component={Menus} />
                <PrivateRoute exact path='/menu/:id' component={Menu} />
              </Switch>
            </section>
          </Fragment>
        </ModalProvider>
      </Router>
    </Provider>
  );
};

export default App;
