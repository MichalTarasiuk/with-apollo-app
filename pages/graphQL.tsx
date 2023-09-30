import {gql, useQuery} from '@apollo/client';
import {initializeApollo, addApolloState} from '../lib/apolloClient';

export default function GraphQLPage() {
  const {
    data: {allSpecies},
  } = useQuery(ALL_SPECIES_QUERY, {
    context: {
      clientName: 'graphQL',
    },
  });

  return (
    <ul>
      {allSpecies.edges.map(({node: {name}}) => (
        <li>{name}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_SPECIES_QUERY,
    context: {
      clientName: 'graphQL',
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

const ALL_SPECIES_QUERY = gql`
  query allSpecies {
    allSpecies {
      edges {
        node {
          name
        }
      }
    }
  }
`;
