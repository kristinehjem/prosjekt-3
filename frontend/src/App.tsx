import './App.css';
import FilmGrid from './components/FilmGrid/FilmGrid'

function App() {
  return (
  <div className="App">
    <div className="Header">
      <header>
        <h1>Hei jeg er header</h1>
      </header>
    </div>
    <div className="App">
        <FilmGrid></FilmGrid>
      </div>
    </div>
  );
}

export default App;
