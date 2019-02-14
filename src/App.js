import React from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import DeleteInventory from './components/delete';
import InsertInventory from './components/insert';

const client = new ApolloClient({
  uri: 'https://ds-inventory-manager.herokuapp.com/v1alpha1/graphql',
});

const GET_INVENTORY = gql`
  query GetInventory {
    inventory {
      id
      name
      price
      inventory_id
    }
  }
`;

const Inventory = () => (
  <Query query={GET_INVENTORY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error: ${error.message}`;

      return (
        <div>
          {data.inventory &&
            data.inventory.map(inv => (
              <div key={inv.id}>
                <DeleteInventory id={inv.inventory_id} />
                {inv.inventory_id}
              </div>
            ))}
        </div>
      );
    }}
  </Query>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <InsertInventory />
        <Inventory />
      </div>
    </ApolloProvider>
  );
};

export default App;
