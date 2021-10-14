import './App.css';
import FilmGrid from '../components/FilmGrid/FilmGrid'
import SideBar from '../components/SideBar/SideBar'
import  { Provider} from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
