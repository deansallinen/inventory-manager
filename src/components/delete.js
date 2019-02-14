import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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

const DELETE_INVENTORY = gql`
  mutation($id: uuid) {
    delete_inventory(where: { inventory_id: { _eq: $id } }) {
      affected_rows
      returning {
        inventory_id
      }
    }
  }
`;

const DeleteInventory = ({ id }) => {
  return (
    <Mutation
      mutation={DELETE_INVENTORY}
      update={(cache, { data: { delete_inventory } }) => {
        const { inventory } = cache.readQuery({ query: GET_INVENTORY });
        cache.writeQuery({
          query: GET_INVENTORY,
          data: {
            inventory: inventory.filter(inv => {
              const [deleted] = delete_inventory.returning;
              return inv.inventory_id !== deleted.inventory_id;
            }),
          },
        });
      }}
    >
      {delete_inventory => (
        <div>
          <button
            className="p-2 shadow bg-red-lightest rounded-full"
            onClick={e => {
              e.preventDefault();
              delete_inventory({ variables: { id } });
            }}
          >
            Delete
          </button>
        </div>
      )}
    </Mutation>
  );
};

export default DeleteInventory;
