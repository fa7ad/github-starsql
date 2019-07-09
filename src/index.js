import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import UserEntry from './UserEntry';
import Repositories from './Repositories';

import './index.css';
import * as serviceWorker from './serviceWorker';

let GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  const stored = localStorage.getItem('github_token');
  if (stored) {
    GITHUB_TOKEN = stored;
  } else {
    GITHUB_TOKEN = window.prompt('Enter your github token');
  }

  localStorage.setItem('github_token', GITHUB_TOKEN);
}

const link = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`
  }
});

const client = new ApolloClient({ link, cache: new InMemoryCache() });

const App = props => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path='/' exact component={UserEntry} />
        <Route path='/repos/:userName' component={Repositories} />
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
