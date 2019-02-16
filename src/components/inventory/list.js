import React from 'react';
import gql from 'graphql-tag';
import DeleteInventory from './delete';
import { Query } from 'react-apollo';

const GET_INVENTORY = gql`
  query GetInventory {
    inventory {
      id
      name
      price
      inventory_id
      description
    }
  }
`;

const AllInventory = () => (
  <Query query={GET_INVENTORY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error: ${error.message}`;

      return (
        <div>
          {data.inventory &&
            data.inventory.map(inv => (
              <div className="flex items-baseline my-2" key={inv.id}>
                <DeleteInventory id={inv.inventory_id} />
                <div>{inv.name}</div>
                <div>{inv.price}</div>
                <div>{inv.description}</div>
              </div>
            ))}
        </div>
      );
    }}
  </Query>
);

export default AllInventory;
