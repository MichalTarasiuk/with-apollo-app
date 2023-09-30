import {gql, useQuery} from '@apollo/client';
import {initializeApollo, addApolloState} from '../lib/apolloClient';

export default function IndexPage() {
  const {
    data: {allSpecies},
  } = useQuery(ALL_SPECIES_QUERY);

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
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

const ALL_SPECIES_QUERY = gql`
  query allSpeciesQuery {
    allSpecies {
      edges {
        node {
          name
        }
      }
    }
  }
`;
