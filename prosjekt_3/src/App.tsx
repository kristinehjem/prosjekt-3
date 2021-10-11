import React from 'react';
import logo from './logo.svg';
import './App.css';
import FilmGrid from './components/FilmGrid/FilmGrid'

function App() {
  return (
    <><div className="Header">
      <header>
        <h1>Hei jeg er header</h1>
      </header>
    </div><div className="App">
        <FilmGrid></FilmGrid>
      </div></>
  );
}

export default App;
