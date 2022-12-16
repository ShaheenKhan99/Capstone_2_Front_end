import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import SearchDBBusinesses from "./SearchDBBusinesses";
import BusinessCard from "./BusinessCard";
import LoadingSpinner from "../common/LoadingSpinner";
import TripcardsApi from "../api/api";


/** Show page with list of businesses in database saved by users.
 * 
 * On mount, loads businesses from the database/API, reloads filtered businesses on submit from search form
 * 
 * This is routed to at /businesses
 * 
 * BusinessList -> BusinessCard-> BusinessDetail
 */


const BusinessList = () => {
    console.debug("BusinessList");
  
    const [businesses, setBusinesses] = useState(null);
    
    useEffect(function getBusinessesOnMount() {
    searchDB();
    }, []);
  
    /** Triggered by search form submit; reloads businesses */
    async function searchDB(category_name, city) {
      try {
        let businesses = await TripcardsApi.getBusinessesByCategoryAndDestination(category_name, city);
        setBusinesses(businesses);
       } catch (err) {
        console.error("There are no businesses saved by users", err.message);
       }  
    }
  
    if (!businesses) return  <LoadingSpinner />;

    
    return (
      <>  
          <div className="BusinessList"> 
            <h5 className="text-center">Check out places saved by other users</h5>   
            <SearchDBBusinesses searchDB={searchDB} />
          </div>

          <Container>
            {businesses.length ? (
              <Row className="BusinessList-container row-cols-1 row-cols-md-2 h-1 g-4">
              
                {businesses.map((business) => (
                  <Col>
                    <BusinessCard key={business.id}
                                  id={business.id}
                                  yelp_id={business.yelpId}
                                  business_name={business.business_name}
                                  address1={business.address1}
                                  address2={business.address2}
                                  city={business.city}
                                  state={business.state}
                                  country={business.country}
                                  zip_code={business.zipCode}
                                  latitude={business.latitude}
                                  longitude={business.longitude}
                                  phone={business.phone}
                                  image_url={business.imageURL}
                                  url={business.url}
                                  rating={business.rating}
                                  yelpReview_count={business.yelpReviewCount}
                                  category_name={business.categoryName}
                                  category_id={business.categoryID}
                                  destination_id={business.destinationID}
                      /> 
                    </Col>
                ))}

              </Row>)
              :
              <p className="lead text-center">Sorry, no favorites found</p>
            }
          </Container>
      </>
  );
}

export default BusinessList;