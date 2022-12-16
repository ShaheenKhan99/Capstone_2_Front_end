import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "./SearchYelpBusinesses.css";


// SearchYelpBusinesses provides a form that a user can use to search for businesses.

const SearchYelpBusinesses = (props) => {
  const [term, setTerm] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("best_match");
  
  const sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count"
  }

  // used to check if sort by option link is active
  const getSortByClass = 
                  sortByOption => sortBy === sortByOption ? "active" : "";

  // sets state of a sorting option 
  const handleSortByClick = sortByOption => setSortBy(sortByOption);

  // sets state of the term on change
  const handleTermChange = e => setTerm(e.target.value);

  // sets state of the location on change
  const handleLocationChange = e => setLocation(e.target.value);

  // return li tag with each key of the sortByOptions object
  const renderSortByOptions = () => Object.keys(sortByOptions)
                      .map(sortByOption => {
                      const sortByOptionValue = sortByOptions[sortByOption];
                      return (
                        <li key={sortByOptionValue}
                            className={getSortByClass(sortByOptionValue)}
                            onClick={() => handleSortByClick(sortByOptionValue)}> 
                              {sortByOption}
                        </li>
                      );
                   });

  // Pass current state when user submits search button
  const handleSearch = (e) => {
      e.preventDefault();
      props.searchYelp(term, location, sortBy);
  };

  return (
        <Container className="SearchYelpBusinesses">
          <div className="SearchYelpBusinesses-sort-options">
            <ul>
              { renderSortByOptions() }
            </ul>
          </div>

          <div className="SearchYelpBusinesses-fields">
            <input className="form-control form-control-md"
                    placeholder="Hotels, restaurants, parks... " 
                    onChange={handleTermChange} />
            <input placeholder="Where to?" 
                   onChange={handleLocationChange} />
          </div>

          <div className="SearchYelpBusinesses-search">
            <Button variant="light"
                      size="lg" 
                      type="submit"
                      className="SearchyelpBusinesses-searchButton"
                      onClick={handleSearch} 
                      aria-label="SearchYelpBusinesses">
                  Search
            </Button>
          </div>
        </Container>
  );
}

export default SearchYelpBusinesses;