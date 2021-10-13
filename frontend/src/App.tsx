import './App.css';
import FilmGrid from './components/FilmGrid/FilmGrid'
import SideBar from './components/SideBar/SideBar'

function App() {
  return (
  <div className="App">
    <div className="header">
      <header>
        <h1>IMDb TOP 100 Movies</h1>
      </header>
    </div>
    <div className="contentgrid">
      <div className="sidebar">
      <SideBar></SideBar>
      </div>
      <div className="filmgrid">
      <FilmGrid></FilmGrid>
      </div>
    </div>
  </div>
  );
}

export default App;
