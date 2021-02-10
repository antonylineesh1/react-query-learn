import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

function App() {

  // const queryInfo = useQuery('pokemon', async () => {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return axios.get('https://pokeapi.co/api/v2/pokemon')
  //     .then(res => res.data.results);
  // });

  const [state, setstate] = useState([
    [{ "color": "red" }, { "color": null }, { "color": null }],
    [{ "color": null }, { "color": null }, { "color": null }],
    [{ "color": null }, { "color": null }, { "color": null }]
  ])

  const common = (stateCopy, i1, j1, i, j) => {
    stateCopy[i1][j1].color = stateCopy[i][j].color;
    stateCopy[i][j].color = null;
  }

  const handleLeftClick = () => {


    const stateCopy = JSON.parse(JSON.stringify(state));
    let returnFlag = false;

    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        console.log(`${i} ${j}`, state[i][j]);

        if (state[i][j].color) {

          let i1 = i;
          let j1 = j;

          // console.log(`color present`, state[i][j].color);
          if (i1 === 0 && j1 === 0) {
            i1 = stateCopy.length - 1;
            j1 = stateCopy[i].length - 1;
            common(stateCopy, i1, j1, i, j);
            returnFlag = true
            // return;
          }
          else if (j1 === 0) {
            i1 = i1 - 1;
            j1 = stateCopy[i].length - 1;
            common(stateCopy, i1, j1, i, j);
            returnFlag = true
            // return;
          }
          else {
            j1 = j1 - 1;
            common(stateCopy, i1, j1, i, j);
            returnFlag = true
            // return;
          }

        }
      }
    }
    setstate(stateCopy);

    console.log("state", state);
    // state.map((row, i) => {
    //   row.map((col, j) => {
    //     if (col.color) {

    //     }
    //   })
    // })
  }
  return (
    <div className="App">

      {console.log('rerender')}
      {state.map((_row, i) => {
        return (
          <div key={i}>
            {_row.map((_col, j) => <span key={j} style={{ background: _col.color, width: "200px", height: "200px" }}>{j}</span>)}
            <br />
          </div>
        )
      })}

      <button onClick={() => handleLeftClick()}>Left Button</button>
      {/* <h1>Welcome All</h1>

      {queryInfo.isLoading ? 'Loading...' : <div>
        {queryInfo.data.map(result => <div key={result.name}>{result.name}</div>)}
      </div>} */}

    </div>
  );
}

export default App;
