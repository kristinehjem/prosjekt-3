import * as React from "react";
import SearchBar from "material-ui-search-bar";
import "../SearchField/SearchField.css";
import { useAppSelector } from '../../features/hooks';
import { useAppDispatch } from '../../features/hooks';
import { updateSearchFilter } from '../../features/searchFilter';

export default function SearchField() {
  const searchFilter = useAppSelector((state) => state.searchFilter.value);
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState("");

  function update(newValue: string) {
    dispatch(updateSearchFilter( 
      {title: newValue}))
  };

  //Sets a timer so the database call only runs when user doesnt write for 1 sec
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {update(state);
    },700);
    return () => clearTimeout(timeoutId);
  }, [state]);
  

    return (
      <div className="searchbar">
      <SearchBar
        value = {state}
        onChange={setState}
        onCancelSearch = {() => dispatch(updateSearchFilter(
          {title: ""}))}
        placeholder="Movie title"
      />
    </div>
  );
}
