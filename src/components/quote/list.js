import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_QUOTES = gql`
  query GetQuotes {
    quote {
      quote_id
      quote_name
      userByuserId {
        name
      }
      customerBycustomerId {
        name
      }
    }
  }
`;

export const QuotesList = () => (
  <Query query={GET_QUOTES}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error: ${error.message}`;

      return (
        <div>
          {data.quote &&
            data.quote.map(quote => (
              <div className="flex items-baseline my-2" key={quote.quote_id}>
                <div>{quote.quote_name}</div>
                <div>{quote.userByuserId.name}</div>
                <div>{quote.customerBycustomerId.name}</div>
              </div>
            ))}
        </div>
      );
    }}
  </Query>
);

export default QuotesList;
