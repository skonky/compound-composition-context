import { graphql } from "gql.tada";

const ProductQuery = graphql(`
  #graphql
  query Product($id: ID!) {
    product(where: { id: $id }) {
      id
      title
      price {
        value
        currency
      }
      image {
        portrait {
          url
        }
        landscape {
          url
        }
      }
    }
  }
`);

export default ProductQuery;
