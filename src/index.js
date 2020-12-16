import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './state/reducers/rootReducer';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import 'antd/dist/antd.less';
import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { HomePage } from './components/pages/Home';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
// new imports
import Registration from './components/pages/Registration/Registration';
import GroomerRegistration from './components/pages/GroomerRegistration/GroomerRegistration';
import CustomerRegistration from './components/pages/CustomerRegistration/CustomerRegistration';
import CustomerDashboard from './components/pages/CustomerDashboard/CustomerDashboardContainer';
import GroomerDashboard from './components/pages/GroomerDashboard/GroomerDashboardContainer';
import MyMap from './components/MyMap/MyMap';
import { SearchForm } from './components/pages/search';
import GroomerDisplay from './components/pages/ProfileDisplay/GroomerDisplay';
// import Footer from './components/Layouts/Footer';
// import Navigation from './components/Layouts/Navigation';
// import Home from './components/Home';
import RenderHomePage from './components/pages/Home/RenderHomePage';
import './styles/UserProfile.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();
  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };
  return (
    <div className="index-container">
      {/* Added features */}
      {/* <Navigation /> */}
      <Security {...config} onAuthRequired={authHandler}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/home" component={RenderHomePage} />
          <Route path="/SearchForm" component={SearchForm} />
          <Route path="/implicit/callback" component={LoginCallback} />
          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <SecureRoute
            path="/"
            exact
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />
          <SecureRoute path="/example-list" component={ExampleListPage} />{' '}
          <SecureRoute path="/profile-list" component={ProfileListPage} />
          <SecureRoute path="/register" component={Registration} />
          <SecureRoute path="/groomers/:id" component={GroomerDisplay} />
          <SecureRoute path="/groomers" component={GroomerRegistration} />
          <SecureRoute path="/customers" component={CustomerRegistration} />
          <SecureRoute
            path="/customer-dashboard"
            component={CustomerDashboard}
          />
          <SecureRoute path="/groomer-dashboard" component={GroomerDashboard} />
          <SecureRoute path="/googlemap-component" component={MyMap} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Security>
      {/* <Footer /> */}
    </div>
  );
}
