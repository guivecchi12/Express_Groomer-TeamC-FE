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
import { NotFoundPage } from './components/NotFound';
import { HomePage } from './components/HomePage';
import { ProfileListPage } from './components/ProfileList';
import { LoginPage } from './components/Login';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
// new imports
import Registration from './components/Registration/Registration';
import GroomerRegistration from './components/groomers/GroomerRegistration/GroomerRegistration';
import CustomerRegistration from './components/customers/CustomerRegistration/CustomerRegistration';
import CustomerDashboard from './components/customers/CustomerDashboard/CustomerDashboardContainer';
import GroomerDashboard from './components/groomers/GroomerDashboard/GroomerDashboardContainer';
import MyMap from './components/MyMap/MyMap';
import { SearchForm } from './components/search';
import GroomerDisplay from './components/groomers/GroomerDisplay';
import Home from './components/Home';
import './styles/UserProfile.css';
import CustomerDashboardContainer from './components/customers/CustomerDashboard/CustomerDashboardContainer';
//import pet component

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
      <Security {...config} onAuthRequired={authHandler}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/SearchForm" component={SearchForm} />
          <Route path="/implicit/callback" component={LoginCallback} />
          {/* <Route path="/" exact component={Home} /> */}
          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <SecureRoute
            path="/"
            exact
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />
          <SecureRoute path="/profile-list" component={ProfileListPage} />
          <SecureRoute path="/register" component={Registration} />
          <SecureRoute
            path="/customer-dashboard/groomers/:id"
            render={props => (
              <CustomerDashboardContainer>
                <GroomerDisplay />
              </CustomerDashboardContainer>
            )}
          />
          <SecureRoute
            path="/customer-dashboard/groomers"
            render={props => (
              <CustomerDashboardContainer>
                <SearchForm />
              </CustomerDashboardContainer>
            )}
          />
          <SecureRoute
            path="/customer-dashboard/pets"
            render={props => (
              <CustomerDashboardContainer>"Pets"</CustomerDashboardContainer>
            )}
          />
          <SecureRoute
            path="/customer-dashboard"
            render={props => <CustomerDashboard {...props} />}
          />
          <SecureRoute
            path="/register/groomers"
            component={GroomerRegistration}
          />
          <SecureRoute
            path="/register/customers"
            component={CustomerRegistration}
          />
          <SecureRoute path="/groomer-dashboard" component={GroomerDashboard} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Security>
    </div>
  );
}
