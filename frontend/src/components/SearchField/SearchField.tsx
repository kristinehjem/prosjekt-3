import * as React from "react";
import SearchBar from "material-ui-search-bar";
import "../SearchField/SearchField.css";

export default function SearchField() {
<<<<<<< HEAD
  const [state, seState] = React.useState();

  return (
    <div className="searchbar">
      <SearchBar
        value={state}
=======
  const [state, setState] = React.useState("");
  
    return (
      <div className="searchbar">
      <SearchBar
        value = {state}
        onChange={(newValue) => setState(newValue)}
        onCancelSearch = {() => setState("")}
>>>>>>> master
        placeholder="Search for movie title"
        aria-label="search-bar"
      />
    </div>
  );
}
