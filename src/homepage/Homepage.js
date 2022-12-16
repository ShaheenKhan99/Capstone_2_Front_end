import { useState, useContext } from "react";
import TripcardsApi from "../api/api";
import UserContext from "../auth/UserContext";
import YelpBusinessesList from "../yelpbusinesses/YelpBusinessesList";
import SearchYelpBusinesses from "../yelpbusinesses/SearchYelpBusinesses";
import Footer from "../common/Footer";
import "./Homepage.css";


/** Homepage of site.
 * 
 * Searches for businesses on Yelp from this site. Does not require any login
 * 
 * Routes -> Homepage
 * 
 */

const Homepage = () => {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  const [businesses, setBusinesses] = useState([]);

  const searchYelp = async (term, location, sortBy) => {
    try {
          let businesses = await TripcardsApi.getBusinessesFromYelpApi(term, location, sortBy); 
          setBusinesses(businesses);
        } catch (error) {
          console.log(error.response);
       }    
  }

  return (
        <>
          <div className="Homepage">
      
              <SearchYelpBusinesses searchYelp={searchYelp} />
              <YelpBusinessesList businesses={businesses} />
              <Footer />
    
          </div>      
        </>
      );
}

export default Homepage;