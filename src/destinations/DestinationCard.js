import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";

import UserContext from "../auth/UserContext";

import "./DestinationCard.css";


/** Show information about a destination
 * 
 * Is rendered by DestinationCardList to show a "card" for each destination 
 * 
 * Receives a createTripcard func that creates a tripcard for a selected destination if tripcard does not exist for that destination
 * 
 * DestinationCardList -> DestinationCard 
 */

const DestinationCard = ({ id, city, state, country }) => {

  console.debug("DestinationCard", 
                "destination_id=", id,
                );

  const { currentUser, 
          hasCreatedTripcard,
          createTripcard,
          tripcard,
          setTripcard,
           } = useContext(UserContext);

  const [created, setCreated] = useState();
  const [show, setShow] = useState();
  
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({ 
                                    destination_id: "",
                                    user_id: "",
                                    username: "",
                                    city: "",
                                    state: "",
                                    country: "",
                                    created_on: "",
                                    keep_private: false,
                                    has_visited: false
                                 });
  const [formErrors, setFormErrors] = useState([]);
  const [disabled, setDisabled] = useState(hasCreatedTripcard);


  useEffect(function updateCreatedStatus() {
    console.debug("Destinationcard, useEffect updateCreatedStatus", "id=", id);
    
    setCreated(hasCreatedTripcard(id));
  }, [id, hasCreatedTripcard]);

  
  /** Create tripcard for user for this destination */
  async function handleSubmit(evt) {
    evt.preventDefault();
      if (hasCreatedTripcard(id)) return;
      
      let data = {
          username: currentUser.username,
          city: city,
          state: state,
          country: country,
          created_on: new Date(),
          keep_private: formData.keep_private,
          has_visited: "false"
        }
    
          const tripcard = await createTripcard(id, data);
          setShow(true);
          setTripcard(tripcard);
          setCreated(true);  
          setDisabled(true);
          setFormData(data => ({ ...data }));
          setFormErrors([]);
        }

    // If a tripcard already exists for this destination, direct to profile page
  function tripcardExists() {
      return (
              <Link to="/profile" type="profileLink">
                <Button className="DestinationCard-link"           
                        variant="secondary" 
                        size="sm"
                        to="/profile">
                              Go to my tripcards
                </Button>
              </Link>
    );
  }

  // If tripcard for destination does not exist, display a form to create tripcard
  function tripcardDoesNotExist() {
    return (
            <Form onSubmit={handleSubmit}>
              <Form.Check
                      key={`keep_private-checkbox`}
                      type={"checkbox"}
                      name={"keep_private"}
                      label={"Keep Private"}
                      className="px-5"
                      checked={checked}
                      onChange={e => setChecked(e.target.checked)}
            />

              <Button className="DestinationCard-button mt-1"
                      variant="secondary" 
                      size="sm"
                      type="submit"
                      disabled={created}
                      onSubmit={handleSubmit} 
                      >Create
              </Button> 
          </Form>
        )
      }
 
  return (
          <>
              <Card className="DestinationCard-card px-3" style={{ backgroundColor: '#cad9cc' }}>
                {created}
                <Card.Body className="DestinationCard-cardBody">
                  {show ?
                    <Alert variant="success">
                      <Alert.Link href="/">Tripcard created. Search for places</Alert.Link>
                    </Alert>
                  :
                    null }

                  <Card.Title>{city}</Card.Title>
                    <Card.Text>{state} {country}</Card.Text> 


                      {created ?
                        tripcardExists() : tripcardDoesNotExist()
                      }
                  
                </Card.Body> 
              </Card>    
          </>
        );
      }

export default DestinationCard;