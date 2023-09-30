import {gql, useQuery} from '@apollo/client';
import {initializeApollo, addApolloState} from '../lib/apolloClient';

export default function RestPage() {
  const {data} = useQuery(LUKE_QUERY);

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: LUKE_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

const LUKE_QUERY = gql`
  query luke {
    person @rest(type: "Person", path: "people/1/") {
      name
    }
  }
`;
