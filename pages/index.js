import {initializeApollo, addApolloState} from '../lib/apolloClient';

function SSRPage() {
  return null;
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default SSRPage;
