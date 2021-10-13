import SearchBar from "material-ui-search-bar";
import "../SearchField/SearchField.css";

export default function SearchField() {
    return (
      <div className="searchbar">
      <SearchBar
        placeholder="Search for movie title"
      />
    </div>
  );
}
