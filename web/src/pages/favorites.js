import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_MY_FAVORITES } from '../gql/query';
import NoteFeed from '../components/NoteFeed'

const Favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Favorites — Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES)
  console.log(data)

  if(loading) return <p>Loading...</p>
  if(error) return `Error! ${error.message}`
  if(data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />
  } else {
    return <p>No favorites yet</p>
  }
};

export default Favorites;
