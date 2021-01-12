import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { HomePage } from '../components/HomePage';
import { LoadingComponent } from '../components/common';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../state/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

afterEach(cleanup);

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {
        getUser: () => Promise.resolve({ name: 'sara' }),
      },
    };
  },
}));

describe('<HomeContainer /> testing suite', () => {
  test('mounts a page', async () => {
    const { findByText, getByText, queryByText } = render(
      <Provider store={store}>
        <Router>
          <HomePage
            LoadingComponent={() => (
              <LoadingComponent message="...fetching user profile" />
            )}
          />
        </Router>
      </Provider>
    );
    let loader = getByText(/...fetching user profile/i);
    expect(loader).toBeInTheDocument();

    // await waitFor(async () => {
    //   await findByText(/are you a/i);
    // });
    loader = queryByText(/...fetching user profile/i);
    expect(loader).not.toBeNull();
  });
});
