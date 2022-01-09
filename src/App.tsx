import './App.css';
import { useState } from 'react';
import { interpolate } from './components/common';
import { PaletteMaker } from './components/PaletteMaker';

function App() {
  const [p, setP] = useState<string[]>([]);
  return (
    <div className="App">
      <header className="App-header">
        <PaletteMaker onchange={(result) => setP(interpolate(result.begin, result.end, result.steps))} />
        <small>[Output]</small>
        {
          p.map(v => <span key={v}>{v}</span>)
        }
      </header>
    </div>
  );
}

export default App;
