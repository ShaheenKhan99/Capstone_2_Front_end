import { Container, Row, Col } from 
"react-bootstrap";

import YelpBusiness from './YelpBusiness';


/** Show page with list of businesses returned from Yelp API through searchYelpBusinesses.
 * 
 * YelpBusinessesList -> YelpBusiness
 * This is routed to at /
 * 
 * YelpBusinessesList -> YelpBusiness
 */

const YelpBusinessesList = ({ businesses }) => {
  console.debug("YelpBusinessesList", "businesses=", businesses);

//  const { currentUser} = useContext(UserContext);

  return (
        <Container className="YelpBusinessesList-container mt-2">
              <Row className="YelpBusinessesList-row row-flex">
                {businesses.map(business => (
                  <Col  sm={6} md={4} className="BusinessesList-col mb-3">
                    <YelpBusiness key={business.yelp_id}
                                    yelp_id={business.yelp_id}
                                    business_name={business.business_name}
                                    address1={business.address1}
                                    address2={business.address2}
                                    city={business.city}
                                    state={business.state}
                                    country={business.country}
                                    zip_code={business.zip_code}
                                    latitude={business.latitude}
                                    longitude={business.longitude}
                                    phone={business.phone}
                                    img_src={business.image_url}
                                    url={business.url}
                                    rating={business.rating}
                                    review_count={business.review_count}
                                    category={business.category}
                            />
                        </Col>
                        
                        ))}
              </Row>
     
      </Container>
    );
};

export default YelpBusinessesList;