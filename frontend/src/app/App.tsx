import './App.css';
import FilmGrid from '../components/FilmGrid/FilmGrid'
import SideBar from '../components/SideBar/SideBar'
import { Provider } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { store } from './store';

function App() {
  useEffect(() => {
    async function test() {
      console.log("hello");
      let response = await axios.get('http://localhost:8081/')
      console.log("response", response);
      //TODO: Setup state with movies data
    }
    test();
  });
  return (
    <Provider store={store}>
      <div className="App">
        <div className="header">
          <header>
            <h1>IMDb TOP 250 Movies</h1>
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
    </Provider>
  );
}

export default App;
