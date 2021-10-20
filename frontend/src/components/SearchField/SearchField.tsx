import * as React from "react";
import SearchBar from "material-ui-search-bar";
import "../SearchField/SearchField.css";

export default function SearchField() {
  const [state, setState] = React.useState("");
  
    return (
      <div className="searchbar">
      <SearchBar
        value = {state}
        onChange={(newValue) => setState(newValue)}
        onCancelSearch = {() => setState("")}
        placeholder="Search for movie title"
        aria-label="search-bar"
      />
    </div>
  );
}
