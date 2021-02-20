import './App.css';
import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

export function Pokemon() {

  const queryInfo = usePokemon();

  return (
    <div>
      {queryInfo.isLoading ?
        'Loading...' :
        queryInfo.isError ?
          'Error ...' : <div>
            {queryInfo.data.map(result => <div key={result.name}>{result.name}</div>)}
          </div>}
      {queryInfo.isFetching && 'Fetching...'}
    </div>
  )
}

function usePokemon() {
  return useQuery('pokemon', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return axios.get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results);
  });
}

function Count() {
  const queryInfo = usePokemon();
  return (
    <div>You are using this {queryInfo.data?.length} pokemons</div>
  );
}

function App() {

  return (

    <div className="App">
      <Pokemon />
      <Count/>
    </div>

  );
}

export default App;
