import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { formatDate } from "../common/Helpers";
import "./TripcardCard.css";

 
/** Shows information about a tripcard
 * 
 * Is rendered by TripcardCardList to show a "card" for each tripcard. Card is a link to details about the tripcard on TripcardPage
 * 
 * TripcardList -> TripcardCardList -> TripcardCard -> TripcardPage
 */

function TripcardCard(tripcard) {

  console.debug("TripcardCard",
                 "id=", tripcard.id);

  
  return (
            <Link className="TripcardCard-link" 
                  to={`/tripcards/${tripcard.id}`} 
                  type="CreateTripcard" 
                  key={tripcard.id}
                  >
              <Card className="TripcardCard-card text-center">
                  <Card.Body className="TripcardCard-cardbody">

                    <Card.Title className="TripcardCard-title">{tripcard.city} </Card.Title>

                      <Card.Text>{tripcard.state}{' '} {tripcard.country} </Card.Text>

                      <Card.Text className="TripcardCard-username">Username:  {tripcard.username} </Card.Text>  

                  </Card.Body>  
                  <Card.Footer style={{ color: "#450b45" }}>Created: {formatDate(tripcard.created_on)}</Card.Footer> 
                </Card> 
            </Link>          
        );
  }

export default TripcardCard;