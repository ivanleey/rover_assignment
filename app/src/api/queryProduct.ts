import { gql } from '@apollo/client';

const GET_PRODUCTS_QUERY = gql`
  query {
    products {
      currency
      id
      description
      price
    }
  }
`;

export default GET_PRODUCTS_QUERY
