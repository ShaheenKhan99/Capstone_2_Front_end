import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TripcardsApi from "../api/api";
import SearchForm from "../common/SearchForm";
import TripcardCardList from './TripcardCardList';
import LoadingSpinner from "../common/LoadingSpinner";


/** Show page with list of tripcards
 * 
 * On mount, loads tripcards from API.
 * Re-loads filtered tripcards on submit from search form.
 * 
 * TripcardList -> TripcardCard -> TripcardDetail
 * 
 * This is routed to at /tripcards
 */

const TripcardList = () => {
  console.debug("TripcardList");

  const [tripcards, setTripcards] = useState(null);


  useEffect(function getAllTripcardsOnMount() {
    console.debug("TripcardList useEffect getAllTripcardsOnMount");
    search();
  }, []);
    

  /** Triggered by search form submit, reloads tripcards */
    async function search(city) {
      let tripcards = await TripcardsApi.getTripcards(city);
      setTripcards(tripcards);
    }

  if (!tripcards) return  <LoadingSpinner />


  return (
      <Container>
          <div className="text-center" style={{ width: '50%', margin: 'auto' }}>
            <h6 className="text-center text-muted mt-4">Select a destination or enter one</h6>
              <SearchForm searchFor={search} />
          </div>

          <div className="TripcardList justify-content-center">
              {tripcards.length ?     
                  <TripcardCardList tripcards={tripcards} />
               : (
                <p className="lead">Sorry, no results were found</p>
                )
              }
          </div>
      </Container>
  );
}

export default TripcardList;

