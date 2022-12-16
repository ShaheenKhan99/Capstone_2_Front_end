import React, { useState } from "react";
import { Button } from "react-bootstrap";

/** Search widget.
 * 
 * Appears on DestinationList, BusinessList, TripcardList, ReviewCardList so that these can be filtered down.
 * 
 * This component does not do the searching but it renders the search form and calls the `searchForm` function prop that runs in a parent to do the searching.
 * 
 * { DestinationList and  TripcardList } -> SearchForm
 */

const SearchForm = ({ searchFor }) => {
  console.debug("SearchForm", 
                "searchFor=", 
                typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");


  /** Tell parent to filter  */

  function handleSubmit(evt) {
    evt.preventDefault();

     // take care of accidentally trying to search for just spaces
    searchFor(searchTerm.trim() || undefined);

    setSearchTerm(searchTerm.trim());
  
  }

  /** Update form fields  */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }


  return (
    <div className="SearchForm mb-4 mt-3">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-sm-10 mb-3">
          <input label='Enter search term'
                  name="searchTerm"
                  className="form-control form-control-md"
                  placeholder="Enter search term"
                  value={searchTerm}
                  onChange={handleChange} 
          />
        </div>
        <div className="col-sm-2">
            <Button variant='secondary'
                    type="submit">
               Search
            </Button>
        </div>
      </form>
    </div>
    
  );
}

export default SearchForm;