import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { getStars } from "../common/Helpers";
import "./YelpBusiness.css";


/** Shows limited information about a business returned from Yelp API
 * 
 * Is rendered by YelpBusinessesList to show a "card" for each business.
 * 
 * YelpBusinessesList -> YelpBusiness 
 * 
 */

const YelpBusiness = (business) => {
  console.debug("business:", business, "yelp_business_id=", business.yelp_id)

  return (
        <Link className="YelpBusiness-Link" to={`api/businesses/${business.yelp_id}`}>
          <Card className="YelpBusiness-card mt-3  mb-1">
            <Card.Img src={business.img_src}
                          position='top' 
                          alt='...' 
                          className="YelpBusiness-image"
                       />
              <Card.Body>
                <Card.Title>{business.business_name}</Card.Title>
                  <Card.Text>{business.address1}</Card.Text>
                  <Card.Text className="lh-1">{business.city} {business.state}  </Card.Text>
                  <Card.Text className="lh-1">{business.country} {business.zip_code}</Card.Text>
                  <Card.Text className="lh-1">{business.review_count} reviews</Card.Text>
                  <div className="stars-rating">
                    <img 
                        className="star-rating" 
                        src={getStars(business)}
                        alt="star-rating"
                    />
                  </div>
              </Card.Body>
            </Card>
        </Link>     
      );
  }

export default YelpBusiness;