import * as React from 'react';
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
    setState(newValue)
    dispatch(updateSearchFilter( 
      {title: newValue}))
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() =>{console.log("timeout");
    },1000);
    return () => clearTimeout(timeoutId);
  }, [state]);

  
    return (
      <div className="searchbar">
      <SearchBar
        value = {state}
        onChange={(newValue) => {update(newValue)}
        }
        onCancelSearch = {() => dispatch(updateSearchFilter(
          {title: ""}))}
        placeholder="Search for movie title"
      />
    </div>
  );
}
