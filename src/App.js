import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios';

function App() {

  const queryInfo = useQuery('pokemon', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return axios.get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results);
  });

  return (
    <div className="App">
      <h1>Welcome All</h1>

      {queryInfo.isLoading ? 'Loading...' : <div>
        {queryInfo.data.map(result => <div key={result.name}>{result.name}</div>)}
      </div>}
    </div>
  );
}

export default App;
