import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
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
import Registration from './components/Registration/Registration';
import GroomerRegistration from './components/groomers/GroomerRegistration/GroomerRegistration.js';
import CustomerRegistration from './components/customers/CustomerRegistration/CustomerRegistration';
import CustomerDashboard from './components/customers/CustomerDashboard/CustomerDashboardContainer';
import GroomerDashboard from './components/groomers/GroomerDashboard/GroomerDashboardContainer';
import MyMap from './components/MyMap/MyMap';
import { SearchForm } from './components/search';
import GroomerDisplay from './components/groomers/GroomerDisplay';
import Home from './components/Home';
import './styles/UserProfile.css';
import CustomerDashboardContainer from './components/customers/CustomerDashboard/CustomerDashboardContainer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

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
  const history = useHistory();
  const authHandler = () => {
    history.push('/login');
  };
  return (
    <div className="index-container">
      <Security {...config} onAuthRequired={authHandler}>
        <Switch>
          {/* <Route
            exact path="/register/customers"
            component={CustomerRegistration}
          /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/SearchForm" component={SearchForm} />
          <Route path="/implicit/callback" component={LoginCallback} />
          {/* any of the routes you need secured should be registered as SecureRoutes */}
          <Route
            path="/"
            exact
            path="/"
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />
          <SecureRoute path="/profile-list" component={ProfileListPage} />
          <SecureRoute exact path="/register" component={Registration} />
          <SecureRoute
            path="/customer-dashboard/groomers/:id"
            render={props => (
              <CustomerDashboardContainer>
                <GroomerDisplay />
              </CustomerDashboardContainer>
            )}
          />
          <SecureRoute
            exact
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
            exact
            path="/register/groomers"
            component={GroomerRegistration}
          />
          <SecureRoute
            exact
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
