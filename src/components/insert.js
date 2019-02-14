import React, { useState } from 'react';
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

const ADD_INVENTORY = gql`
  mutation($name: String, $price: numeric, $description: String) {
    insert_inventory(
      objects: [{ name: $name, price: $price, description: $description }]
    ) {
      returning {
        id
        name
        price
        inventory_id
      }
    }
  }
`;

const InsertInventory = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  return (
    <Mutation
      mutation={ADD_INVENTORY}
      update={(cache, { data: { insert_inventory } }) => {
        const { inventory } = cache.readQuery({ query: GET_INVENTORY });
        cache.writeQuery({
          query: GET_INVENTORY,
          data: { inventory: [...inventory, ...insert_inventory.returning] },
        });
      }}
    >
      {(insert_inventory, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              insert_inventory({ variables: { name, price, description } });
            }}
          >
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="number"
              name="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <input
              type="text"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default InsertInventory;
