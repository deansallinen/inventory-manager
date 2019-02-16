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
      description
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
        description
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
            className=""
            onSubmit={e => {
              e.preventDefault();
              insert_inventory({ variables: { name, price, description } });
            }}
          >
            <label htmlFor="name">Name</label>
            <input
              className="border"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="price">Price</label>
            <input
              className="border"
              type="number"
              name="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <input
              className="border"
              type="text"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button
              className="py-1 px-2 rounded text-green-dark bg-green-lightest shadow"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default InsertInventory;
