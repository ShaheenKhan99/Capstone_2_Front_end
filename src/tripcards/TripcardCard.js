import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { formatCreatedOnDate } from "../common/Helpers";
import "./TripcardCard.css";

 
/** Shows limited information about a tripcard
 * 
 * Is rendered by TripcardList to show a "card" for each tripcard. Card is a link to details about the tripcard
 * 
 * TripcardList -> TripcardCard
 */

function TripcardCard({ id, 
                        destination_id, 
                        user_id, 
                        username, 
                        city, 
                        state, 
                        country, 
                        created_on, 
                        keep_private, 
                        has_visited                        
                        }) {
  console.debug("TripcardCard",
                 "id=", id);
  
  return (
            <Link className="TripcardCard-link" to={`/tripcards/${id}`} type="CreateTripcard" key={id}>
              <Card className="TripcardCard-card text-center">
                  <Card.Body className="TripcardCard-cardbody">
                    <Card.Title>{city} </Card.Title>
                      <Card.Text className="text-muted">{state}{' '} {country} </Card.Text>
                      <Card.Text >Username:  {username} </Card.Text>
                      <Card.Text>Created: {formatCreatedOnDate(created_on)}</Card.Text>
                  </Card.Body>   
                </Card> 
            </Link>          
        );
  }

export default TripcardCard;