import { Card } from "react-bootstrap";

import { formatCreatedOnDate } from "../common/Helpers";
import "./ReviewCard.css";

/** Review Detail page
 * 
 * Rendered by ReviewCardList to show information for each review.
 * 
 * Routes -> ReviewCardList -> ReviewCard
 *            BusinessDetail -> ReviewCardList -> ReviewCard
 *            UserPage -> ReviewCardList -> ReviewCard
 */

 const ReviewCard = ({ id, 
                      user_id, 
                      username, 
                      business_id, 
                      business_name, 
                      text, 
                      rating,
                      created_on, 
                      image_url, 
                       }) => {

  console.debug("ReviewCard", "id=", id);

  return (
          <Card className="ReviewCard card" style={{ backgroundColor: '#cad9cc' }}> 
            <Card.Body className="card-body mx-4">
              <Card.Title className="card-title">Review for {business_name} {' '} <span className="ReviewCard-username"> by {username}</span></Card.Title>
                
              <Card.Text className="lh-1">User rating: {rating} </Card.Text>

                <Card.Text className="lh-1">{text}</Card.Text>
                <Card.Text className="text-muted lh-1">Created: {formatCreatedOnDate(created_on)}</Card.Text>

                {image_url && 
                <Card.Link href={image_url} target="_blank">See photo</Card.Link>
                   }
            </Card.Body>   
          </Card>
  );
}

export default ReviewCard;
