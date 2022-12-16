import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

import TripcardsApi from "../api/api";
import UserContext from "../auth/UserContext";
import Tripcardbusinesses from "./Tripcardbusinesses";
import UpdateTripcardForm from "./UpdateTripcardForm";
import useToggle from "../hooks/useToggle";
import { formatCreatedOnDate } from '../common/Helpers';
import LoadingSpinner from "../common/LoadingSpinner";
import "./TripcardDetail.css";

/** Tripcard Detail page
 * 
 * Renders information about tripcard including businesses saved on tripcard.
 * 
 * Renders upddateTripcard form to edit or button to delete the tripcard 
 * 
 * Routed at /tripcards/:id
 * 
 * Routes -> TripcardCard -> TripcardDetail
 */

const TripcardDetail = ( updateTripcard ) => {
  const { id } = useParams();

  const { currentUser, removeTripcard } = useContext(UserContext);

  console.debug("TripcardDetail", "id=", id);

  const [tripcard, setTripcard] = useState();
  const [tripcardbusinesses, setTripcardbusinesses] = useState([]);

  const [isUpdate, setIsUpdate] = useToggle(false);
  const [deleteTripcard, setDeleteTripcard] = useState()
  const [deleted, setDeleted] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);


  useEffect(function getTripcardAndBusinessesForUser() {
    async function getTripcard() {
      setTripcard(await TripcardsApi.getTripcard(id));
      setTripcardbusinesses(await TripcardsApi.getTripcardBusinesses(id));
    }
    getTripcard();
  }, [id]);

  if (!tripcard) return <LoadingSpinner />;

  // Handle updateTripcard click
  async function handleUpdateClick(evt){
    evt.preventDefault();
    setIsUpdate(true);
  } 

  // Handle deleteTripcard click
  async function handleDeleteClick(evt) {
    evt.preventDefault()
    setDeleteTripcard(await removeTripcard(evt, id));
    setButtonDisabled(true);
    setDeleted(true);
  }


  return (
      <> 
        <div>
          <Container className="container py-1" style={{ height: '25%' }}>
                <Card className="TripcardDetail-card">
                  <Card.Body className="TripcardDetail-cardbody text-center">
                    <Row>
                      <div className="BusinessDetail-deletedAlert mb-2">
                        {deleted ? 
                          <Alert variant="danger">
                            <Alert.Link href="/"> Deleted!    Explore other places</Alert.Link> 
                          </Alert>
                        : null 
                        } 
                        </div>

                        <Col sm="9">
                          <Card.Title>Tripcard for {tripcard.city} </Card.Title>
                          <Card.Text className="mb-3 text-muted">
                           {tripcard.state}  {tripcard.country}
                            </Card.Text>
                            <Card.Text className="mb-3">
                            username: {tripcard.username} 
                            </Card.Text>
                            <Card.Text className="mb-3">Created on: {formatCreatedOnDate(tripcard.createdOn)}</Card.Text>
                        </Col>

                        <Col sm="3">
                          <div className="pb-2 mb-4 mt-2">
                              <Button variant="outline-dark" 
                                      onClick={handleUpdateClick}>
                                    Edit
                              </Button>
                          </div>

                          <div>
                              <Button variant="outline-danger" 
                                      disabled={buttonDisabled}
                                      onClick={handleDeleteClick}>
                                    Delete
                              </Button>
                          </div>
                        </Col>
                    </Row>
                  </Card.Body>
                </Card>
          </Container>
        </div>

        <div className="updateTripcardForm">
          {isUpdate ? <UpdateTripcardForm 
                                    key={id}
                                    id={id}
                                    updateTripcard={updateTripcard}
                                    setIsUpdate={setIsUpdate}
                                    tripcard={tripcard}
                  /> : null }
        </div>


        <Container className="Tripcardbusinesses-section">
          <h5 className="mt-3 mb-2 p-4 text-center">Saved Places</h5> 
            {tripcard.tripcardbusinesses.length ? 
              ( 
               <Tripcardbusinesses tripcardbusinesses={tripcardbusinesses}
                />
              )
            : 
              <p className="mb-2 p-3 text-center">No places saved yet!</p>}
        </Container>

    </>
  );
}

export default TripcardDetail;