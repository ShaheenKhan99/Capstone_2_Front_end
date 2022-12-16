import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import SearchForm from "../common/SearchForm";
import DestinationCardList from "./DestinationCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import TripcardsApi from "../api/api";


/** Show page with list of destinations.
 * 
 * On mount, loads destinations from API.
 * Re-loads filtered destinations on submit from search form;
 * 
 * This is routed to at /destinations
 * 
 * DestinationList -> DestinationCardList -> DestinationCard
 */

const DestinationList = () => {
  console.debug("DestinationList");

  const [destinations, setDestinations] = useState(null);

  useEffect(function getDestinationsOnMount() {
    console.debug("DestinationList useEffect getDestinationsOnMount");
    search();
  }, []);
  

  /** Triggered by search form submit; reloads destinations */
  async function search(city) {
    let destinations = await TripcardsApi.getDestinations(city);

    setDestinations(destinations);
  }

  if (!destinations) return  <LoadingSpinner />;
  
  return (
          <Container className="DestinationList text-center" >
            <div className="text-center" style={{ width: '50%', margin: 'auto' }}>
              <h6 className="text-center text-muted mt-4">Select a destination or enter one</h6>
             <SearchForm searchFor={search} />
            </div>

          
            {destinations.length ? 
              <DestinationCardList destinations={destinations} /> :
                <p className="lead">Sorry, no results were found!</p>
            }
        
          </Container>
    );
}

export default DestinationList;