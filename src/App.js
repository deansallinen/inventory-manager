import React, { useState } from 'react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query, Mutation } from "react-apollo";


const client = new ApolloClient({
  uri: 'https://ds-inventory-manager.herokuapp.com/v1alpha1/graphql'
});



const InvQuery = gql`
{
  inventory{
    name
    price
  }
}
`

const Inventory = () => (
  <Query query={InvQuery}>
    {({ loading, error, data }) => {
      if (loading) return "Loading..."
      if (error) return `Error: ${error.message}`
      
      return (
        <div>
          {data.inventory.map(inv => <div>{inv.name}</div>)}
        </div>
      )
    }
      
    }
  </Query>
)

const InvMutation = gql`
mutation($name:String, $price: numeric, $description: String ) {
  insert_inventory(objects:[
    {name: $name, price: $price, description: $description}
  ]){
    returning{
      id
      name
      price
    }
  }
}`

const AddInventory = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  
  return (
  <Mutation
  mutation={InvMutation}
  update={(cache, {data: {insert_inventory}}) => {
    const {inventory} = cache.readQuery({query: InvQuery});
    cache.writeQuery({
      query: InvQuery,
      data: {inventory: inventory.concat([insert_inventory])}
    })
  }}
  >
    {(insert_inventory, {data}) => (
      <div>
        <form onSubmit={e => {
        e.preventDefault();
        insert_inventory({variables:
          {name, price, description}
        })
        
        }
        }>
          <input type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
          <input type='number' name='price' value={price} onChange={e => setPrice(e.target.value)} />
          <input type='text' name='description' value={description} onChange={e => setDescription(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )}
  </Mutation>
)
}

const App = () => {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        
        <Inventory />
        <AddInventory />
        
      </div>
    </ApolloProvider>
  );
}

export default App;
