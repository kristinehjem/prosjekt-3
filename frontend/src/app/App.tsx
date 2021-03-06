import "./App.css";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import SideBar from "../components/SideBar/SideBar";
import MovieModal from "../components/MovieModal/MovieModal";
import { Provider } from "react-redux";
import { store } from "./store";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// expose store when run in Cypress
// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = store;
}

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:8081/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
            <div className="moviegrid">
              <MovieGrid></MovieGrid>
            </div>
          </div>
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
