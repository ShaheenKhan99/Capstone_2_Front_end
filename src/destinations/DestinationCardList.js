import DestinationCard from "./DestinationCard";
import { Row , Container } from 'react-bootstrap';

/** Show list of destination cards
 * 
 * Used by DestinationList 
 * 
 * Receives a createTripcard func prop which will be called by DestinationCard on selecting destination for tripcard
 * 
 * DestinationList -> DestinationCardList -> DestinationCard
 * 
 */

const DestinationCardList = ({ destinations, createTripcard }) => {
  console.debug("DestinationCardList", "destinations=", destinations);

  return (
    <div className="DestinationCardList">
      <Container className="text-center">
        <Row xs={12} sm={3}  className="justify-content-center">
          {destinations.map(destination => (
             <DestinationCard key={destination.id}
                              id={destination.id}
                              city={destination.city}
                              state={destination.state}
                              country={destination.country}
                              createTripcard={createTripcard}
                      />
            ))}
        </Row>
      </Container>
    </div>
    
  );
}

export default DestinationCardList;
