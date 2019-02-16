import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import QuotesList from './components/quote/list';
import Inventory from './components/inventory';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'https://ds-inventory-manager.herokuapp.com/v1alpha1/graphql',
});

const App = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App flex">
          <div className="flex flex-col">
            <Link to="/inventory" className="px-2 py-1 my-2">
              Inventory
            </Link>
            <Link to="/quotes" className="px-2 py-1 my-2">
              Quotes
            </Link>
          </div>
          <div>
            <Route path="/inventory" component={Inventory} />
            <Route path="/quotes" component={QuotesList} />
          </div>
        </div>
      </ApolloProvider>
    </Router>
  );
};

export default App;
