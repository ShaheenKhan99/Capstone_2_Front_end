import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { getStars } from "../common/Helpers";
import "./BusinessCard.css";

/** Show limited information about a business in Database
 * 
 * Is rendered by BusinessCardList to show a "card" for each business.
 * 
 * BusinessCardList -> BusinessCard -> BusinessDetail
 * 
 */

 const BusinessCard = ({ id, 
                          business_name, 
                          city, 
                          state, 
                          country, 
                          image_url, 
                          sub_category,
                          category_name, 
                          rating, 
                          yelpReview_count}) => {

  console.debug("BusinessCard", 
                  "id=", id, 
                  "business_name=", business_name, 
                   "sub_category", sub_category,
                   "category_name", category_name,
                   "rating", rating);

  
  return (
        <Link className="BusinessCard card" to={`/businesses/${id}`}>
          <Card className="BusinessCard h-100">
                <Card.Img className="BusinessCard-image" 
                          src={image_url} 
                          alt='...' />
              
                <Card.Body>  
                  <Card.Title>{business_name}</Card.Title>
                    <Card.Text className="lh-1">
                        {city} {state}  {country}
                    </Card.Text>
                    <Card.Text className="lh-1">Yelp rating: {rating}</Card.Text>  
                    <Card.Text className="lh-1">Yelp review count:  {yelpReview_count}
                    </Card.Text> 
                    <Card.Text className="BusinessCard-categoryName text-muted">Category: {category_name}</Card.Text>
                </Card.Body>
          </Card>
      </Link>
  );
}


export default BusinessCard;

