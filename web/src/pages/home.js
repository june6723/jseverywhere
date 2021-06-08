import React, { useCallback } from 'react';
import { useQuery } from '@apollo/client'
import NoteFeed from '../components/NoteFeed'
import Button from '../components/Button'
import { GET_NOTES } from '../gql/query';

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES)

  const handleClick = useCallback(() => {
    fetchMore({
      variables: {
        cursor: data.noteFeed.cursor
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return {
          noteFeed: {
            cursor: fetchMoreResult.noteFeed.cursor,
            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
            notes: [
              ...prevResult.noteFeed.notes,
              ...fetchMoreResult.noteFeed.notes
            ],
            __typename: 'noteFeed'
          }
        }
      }
    })
  }, [fetchMore, data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button onClick={handleClick}>Load more</Button>
      )}
    </React.Fragment>
  );
};

export default Home;
