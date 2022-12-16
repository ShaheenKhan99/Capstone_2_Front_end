import { Link } from "react-router-dom";
import { Card, Row, Col } from 'react-bootstrap';
import { getStars } from '../common/Helpers';

import "./Tripcardbusinesses.css";

/** Shows limited information about a business on a tripcard
 * 
 * Is rendered by TripcardDetail to show a "card" for each business.
 * 
 * TripcardDetail -> Tripcardbusinesses
 * 
 */

const Tripcardbusinesses = ({ tripcardbusinesses }) => {

  return (
            tripcardbusinesses.map((tripcardbusiness) => (
              <Link className="BusinessCard card mb-3" 
                        to={`/businesses/${tripcardbusiness.id}`}
                        key={tripcardbusiness.id}>
                <Card className="Tripcardbusiness-card" key={tripcardbusiness.id}>
                  <Card.Body className="card-body">
                    <Row> 
                      <Col sm={6}>
                        <Card.Img variant="top" 
                              className="Business-image"
                              src={tripcardbusiness.image_url} />
                      </Col>

                      <Col sm={6} className="px-2">
                        <Card.Title className="card-title">
                          {tripcardbusiness.business_name} 
                        </Card.Title>
                        <Card.Text>{tripcardbusiness.city}  {tripcardbusiness.state} {tripcardbusiness.country}</Card.Text>
                        <Card.Text>CategoryName: {tripcardbusiness.categoryName}</Card.Text>

                        <div className="BusinessYelpDetail-starRating">
                          <img src={getStars(tripcardbusiness)} alt="star rating" />
                        </div>
                  
                      </Col>
                    </Row> 
                  </Card.Body>
                </Card>
              </Link>
          ))
  );
}

export default Tripcardbusinesses;

