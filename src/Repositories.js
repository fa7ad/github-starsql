import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import './App.css';

const GET_REPOS = gql`
  query($login: String!) {
    user(login: $login) {
      repositories(first: 100) {
        nodes {
          id
          name
          url
          viewerHasStarred
        }
      }
    }
  }
`;

const STAR_REPO = gql`
  mutation($repo: AddStarInput!) {
    addStar(input: $repo) {
      clientMutationId
    }
  }
`;

const UNSTAR_REPO = gql`
  mutation($repo: RemoveStarInput!) {
    removeStar(input: $repo) {
      clientMutationId
    }
  }
`;

const Repositories = ({ match }) => (
  <Query query={GET_REPOS} variables={{ login: match.params.userName }}>
    {({ data: { user }, loading, refetch }) => {
      if (loading || !user) {
        return <div>Loading ...</div>;
      }

      return (
        <RepositoryList repositories={user.repositories} refetch={refetch} />
      );
    }}
  </Query>
);

const toggleStar = mutation => id => e => {
  mutation({
    variables: {
      repo: {
        starrableId: id
      }
    }
  });
};

const RepositoryList = ({ repositories, refetch }) => {
  return (
    <ul>
      {repositories.nodes.map(({ id, url, name, viewerHasStarred }) => {
        return (
          <li key={id}>
            <a href={url}>{name}</a>
            <Mutation
              mutation={viewerHasStarred ? UNSTAR_REPO : STAR_REPO}
              onCompleted={refetch}>
              {star => (
                <button onClick={toggleStar(star)(id)}>
                  {viewerHasStarred ? 'Unstar' : 'Star'}
                </button>
              )}
            </Mutation>
          </li>
        );
      })}
    </ul>
  );
};

export default Repositories;
