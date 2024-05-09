import { graphql } from "gql.tada";
import { useQuery } from "urql";

const ProductsQuery = graphql(`
  query Products {
    products {
      id
    }
  }
`);

export const useProducts = () => {
  const [result] = useQuery({
    query: ProductsQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return fetching;
  if (error) return error;

  return data?.products;
};

export default ProductsQuery;
