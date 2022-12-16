import TripcardCard from "./TripcardCard";

import { Container, Row, Col } from "react-bootstrap";

/** Show list of tripcard cards.
 * 
 * Used by TripcardList and UserPage to list tripcards.
 * 
 * TripcardList -> TripcardCardList -> TripCard -> TripcardDetail
 * UserPage -> TripcardCardList -> TripcardCard
 * 
 */

 function TripcardCardList({ tripcards }) {
  console.debug("TripcardCardList", "tripcards=", tripcards);

  return (
        <Container className="TripcardCardList mt-5">
             
              {tripcards.length ? (
               <Row className="TripcardCardList-row row-cols-1 row-cols-md-3 h-2 g-4">

                {tripcards.map(t => (
                  <Col>
                      <TripcardCard key={t.id}
                                    id={t.id}
                                    destination_id={t.destinationID}
                                    user_id={t.userID}
                                    username={t.username}
                                    city={t.city}
                                    state={t.state}
                                    country={t.country}
                                    created_on={t.createdOn}
                                    has_visited={t.hasVisited}
                                    keep_private={t.keepPrivate}
                      />
                   </Col>
                  ))
                }
                </Row>)
                :
                <p>Sorry, there are no tripcards</p>  
                }
       
      </Container>
  );
}

export default TripcardCardList;