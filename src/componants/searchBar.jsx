import { useState } from "react";

function SearchBar () {

  const [query, setQuery] = useState('')


  function submitSearch(event) {
    event.preventDefault();
    setQuery(event.target.searchBar)
  }

  return (<>
  <form onSubmit={submitSearch}>
    <label className="searchLabel" htmlFor="searchBar">Search: </label>
    <input id="searchBar" type="text"/>
    <button type="submit">Submit</button>
  </form>
  </>)
}

export default SearchBar