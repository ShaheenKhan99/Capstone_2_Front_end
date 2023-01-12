import TripcardCard from "./TripcardCard";

import { Container, Row, Col } from "react-bootstrap";

/** 
 * TripcardCardList - Shows list of tripcard cards.
 * 
 * Used by TripcardList and UserPage to list tripcards.
 * 
 * TripcardList -> TripcardCardList -> TripCard -> TripcardPage
 * UserPage -> TripcardCardList -> TripcardCard
 * 
 */

 function TripcardCardList({ tripcards }) {

  console.debug("TripcardCardList", "tripcards=", tripcards);

  return (
        <Container className="TripcardCardList">

              {tripcards.length ? (
               <Row className="TripcardCardList-row row-flex g-4">

                {tripcards.map(t => (
                   <Col md={4} className="TripcardCardList-col mb-3">
                        <TripcardCard key={t.id}
                                      id={t.id}
                                      destination_id={t.destination_id}
                                      user_id={t.userID}
                                      username={t.username}
                                      city={t.city}
                                      state={t.state}
                                      country={t.country}
                                      created_on={t.created_on}
                                      has_visited={t.has_visited}
                                      keep_private={t.keep_private}
                                    
                        />
                   </Col>
                  ))
                }
                  </Row>)
                :
                  <div>
                    <p>No tripcards yet!</p> 
                  </div> 
                }
       
      </Container>
  );
}

export default TripcardCardList;