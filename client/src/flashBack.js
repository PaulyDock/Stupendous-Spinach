import React from 'react';
import { render } from 'react-dom';

// import css
// import css from './styles/style.styl';

// import components
import App from './components/App';
// import Single from './components/Single';
// import PhotoGrid from './components/PhotoGrid'; 
import Camera from './components/Camera';
import Nearby from './components/Nearby';
import Comments from './components/Comments';

// import react router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Nearby} />
        <Route path='/nearby' component={Nearby} />
        <Route path='/comments/:postId' component={Comments} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));