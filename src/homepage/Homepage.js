import { useState } from "react";

import TripcardsApi from "../api/api";
import YelpBusinessesList from "../yelpbusinesses/YelpBusinessesList";
import SearchYelpBusinesses from "../yelpbusinesses/SearchYelpBusinesses";
import Alert from "../common/Alert";
import useTimedMessage from "../hooks/useTimedMessage";
import Footer from "../common/Footer";
import "./Homepage.css";


/** Homepage of site.
 * 
 * Searches for businesses on Yelp from this page. Does not require any login
 * 
 * Routes -> Homepage
 * 
 */

const Homepage = () => {

  const [businesses, setBusinesses] = useState([]);

  // switch to use limited-time-display message hook
  const [show, setShow] = useTimedMessage();

  const searchYelp = async (term, location) => {

    try {
          let businesses = await TripcardsApi.getBusinessesFromYelpApi(term, location); 
          setBusinesses(businesses);
        } catch (error) {
          console.error(error.message);
          setShow(true);
       }    
  }


  return (
        <>
          <div className="Homepage mt-4">
            <div className="Homepage-heading text-center p-3">
              <h5>Explore places to visit or things to do on your next trip</h5>
            </div>

      
              <SearchYelpBusinesses searchYelp={searchYelp} />
              <YelpBusinessesList businesses={businesses} />

              {show ?
                <Alert type="danger"
                messages={["Could not find any places for this destination. Please try another destination"]} />
              : 
                null }

              <Footer />
    
          </div>      
        </>
      );
}

export default Homepage;