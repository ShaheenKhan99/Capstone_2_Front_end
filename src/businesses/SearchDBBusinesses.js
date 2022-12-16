import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "./SearchDBBusinesses.css";


// SearchDBBusinesses provides a form that a user can use to search for user saved businesses by category and city.

const SearchDBBusinesses = (props)  => {
  const [category_name, setCategoryName] = useState("");
  const [city, setCity] = useState("");
  

  // sets state of the category on change
  const handleCategoryNameChange = e => setCategoryName(e.target.value);

  // sets state of the city on change
  const handleCityChange = e => setCity(e.target.value);

  
  // Pass current state when user submits search button
  const handleSearch = (e) => {
      e.preventDefault();
      props.searchDB(category_name, city);
  };

  return (
          <Container className="SearchDBBusinesses">
            <div className="SearchDBBusinesses-fields">
              <input className="form-control form-control-md"
                      placeholder="Hotels, restaurants, parks... " 
                      onChange={handleCategoryNameChange} />

              <input placeholder="Where?" 
                   onChange={handleCityChange} />
            </div>

            <div className="SearchDBBusinesses-search">
              <Button variant="light"
                      size="sm" 
                      type="submit"
                      className="SearchDBBusinesses-searchButton"
                      onClick={handleSearch} 
                      aria-label="SearchDBBusinesses">
                Search
              </Button>
            </div>
          </Container>
  );
}

export default SearchDBBusinesses;