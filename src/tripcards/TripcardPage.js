import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

import TripcardsApi from "../api/api";
import UserContext from "../auth/UserContext";
import TripcardBusinesses from "./TripcardBusinesses";
import UpdateTripcardForm from "./UpdateTripcardForm";
import useToggle from "../hooks/useToggle";
import { formatDate } from '../common/Helpers';
import LoadingSpinner from "../common/LoadingSpinner";
import "./TripcardPage.css";


/** TripcardPage 
 * 
 * Renders information about tripcard including businesses saved on tripcard.
 * 
 * Renders updateTripcard Form to edit tripcard or a button to delete the tripcard if currentUser is tripcard owner
 * 
 * Routed at /tripcards/:id
 * 
 * Routes -> TripcardCard -> TripcardPage
 */

const TripcardPage = ( updateTripcard ) => {

  const { id } = useParams();

  const { currentUser, removeTripcard } = useContext(UserContext);

  console.debug("TripcardDetail", "id=", id);

  const [tripcard, setTripcard] = useState();
  const [businesses, setBusinesses] = useState([]);

  const [isUpdate, setIsUpdate] = useToggle(false);
  const [deleteTripcard, setDeleteTripcard] = useState()
  const [deleted, setDeleted] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);


  useEffect(function getTripcardAndBusinessesForUser() {
    async function getTripcard() {
      setTripcard(await TripcardsApi.getTripcard(id));
      setBusinesses(await TripcardsApi.getTripcardBusinesses(id));
    }
    getTripcard();
  }, [id]);

  if (!tripcard) return <LoadingSpinner />;


  /** Handles updateTripcard click - renders form to update tripcard */

  async function handleUpdateClick(evt){
    evt.preventDefault();
    setIsUpdate(true);
  } 

  /** Handles deleteTripcard click */

  async function handleDeleteClick(evt) {
    evt.preventDefault()
    setDeleteTripcard(await removeTripcard(evt, id));
    setButtonDisabled(true);
    setDeleted(true);
  }

  return (
      <div>
    
          <Container className="container p-4" style={{ height: '25%' }}>
                <Card className="TripcardPage-card">
                  <Card.Body className="TripcardPage-cardbody text-center">
                    <Row>
                      <div className="TripcardPage-deletedAlert mb-2">
                        {deleted ? 
                          <Alert variant="danger">
                            <Alert.Link href="/"> Deleted!    Explore other places</Alert.Link> 
                          </Alert>
                        : null 
                        } 
                        </div>

                        <Col sm={4}>
                          <Card.Title className="mt-4">Tripcard for {tripcard.city}  </Card.Title>
                            <Card.Subtitle>
                            {tripcard.state}  {tripcard.country}
                            </Card.Subtitle>
                        </Col>
                        <Col sm={5}>
                            <Card.Text className="mt-3">
                            Username: {tripcard.username} 
                            </Card.Text>
                            <Card.Text className="mb-3">Created on: {formatDate(tripcard.created_on)}</Card.Text>
                        </Col>

                        <Col sm={3}>
                          
                          {currentUser.id == tripcard.user_id ? 
                          <>
                          <div className="pb-2 mb-4 mt-2">
                              <Button variant="outline-light" 
                                      onClick={handleUpdateClick}>
                                    Edit
                              </Button>
                          </div>

                          <div>
                              <Button variant="outline-light" 
                                      disabled={buttonDisabled}
                                      onClick={handleDeleteClick}>
                                    Delete
                              </Button>
                          </div>
                          
                        </>
                        : null }
                        </Col>
                    </Row>
                  </Card.Body>
                </Card>
          </Container>

        <div className="updateTripcardForm">
          {isUpdate ? <UpdateTripcardForm 
                                    key={id}
                                    id={id}
                                    updateTripcard={updateTripcard}
                                    setIsUpdate={setIsUpdate}
                                    tripcard={tripcard}
                  /> : null }
        </div>

      
        <Container className="TripcardBusinesses-section p-4">
          <h5 className="text-center">My saved places</h5> 
            {tripcard.tripcardBusinesses.length ? 
              ( 
               <TripcardBusinesses businesses={businesses}
                />
              )
            : 
              <h5 className="mb-2 p-3 text-center" style={{ "color": "#450b45" }}>No places saved yet!</h5>}
        </Container>
      
    </div>
  );
}

export default TripcardPage;