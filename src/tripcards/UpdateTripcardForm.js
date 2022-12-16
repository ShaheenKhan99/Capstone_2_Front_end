import { useState, useContext } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

import { formatCreatedOnDate } from "../common/Helpers";
import TripcardsApi from "../api/api";
import UserContext from "../auth/UserContext";


/** Tripcard update form.
 * 
 * Displays updateTripcard form and handles changes to state on changes.
 * On submission:
 * - calls updateTripcard function prop
 * 
 * Routed as /tripcards/:id/update
 * 
 * Routes -> TripcardDetail -> UpdateTripcardForm -> Alert
 */

const UpdateTripcardForm = ({ tripcard }) => {
  
  const { currentUser, setTripcard } = useContext(UserContext);

  const [formData, setFormData] = useState({
                                              city: "",
                                              state: "",
                                              country: "",
                                              hasVisited: "",
                                              keepPrivate: "",
                                              createdOn: ""
                                          });

  const [formErrors, setFormErrors] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
    
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [saved, setSaved] = useState();
  
 
  // handle update tripcard click
  async function handleSubmit(evt) {
    evt.preventDefault();

    let data = {
          id: tripcard.id,
          user_id: tripcard.user_id,
          destination_id: tripcard.destination_id,
          username: tripcard.username,
          city: tripcard.city,
          state: tripcard.state,
          country: tripcard.country,
          created_on: tripcard.createdOn,
          keep_private: formData.keepPrivate,
          has_visited: formData.hasVisited
    }

    let updatedTripcard;
    try {
          updatedTripcard = await TripcardsApi.updateTripcard(tripcard.id, data); 
          setTripcard(updatedTripcard);
          setFormData(data => ({ ...data}));

        } catch(errors) {
          setFormErrors(errors);
          return;
        }

    setFormErrors([]);
    setSaved(true)
    setButtonDisabled(true); 
  } 


  /** Update form data field */

  function handleChange(evt) {
    const { name, checked } = evt.target;
    setIsChecked(!isChecked);
    setFormData(data => ({ ...data, [name]: checked }));
    setFormErrors([]);
  }
 
  return (
    <div className="UpdateTripcardForm col-md-8 offset-md-2">
      <Card className="mb-4 p-4" style={{ backgroundColor: '#cad9cc' }}>
        <Card.Title> Tripcard for {tripcard.city}</Card.Title>
          <Card.Subtitle>Created on: {formatCreatedOnDate(formData.createdOn)}</Card.Subtitle>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="tripcard.keepPrivate">
                 <div key={`keep_private-checkbox`} className="checkbox mb-3">
                  <Form.Check
                      type={"checkbox"}
                      name={"keep_private"}
                      label={"Keep private"}
                      value={"formData.keepPrivate"}
                      checked={isChecked}
                      onChange={handleChange}
                  />
                </div> 
              </Form.Group>

              <Form.Group className="mb-3" controlId="formData.hasVisited">
                <div key={`has_visited-checkbox`} className="checkbox mb-3">
                  <p>Select if you have visited this destination</p>
                    <Form.Check
                        type={"checkbox"}
                        name={"has_visited"}
                        label={"Visited"}
                        value={"formData.hasVisited"}
                        defaultChecked={false}
                        onChange={handleChange}
                    />
                </div>
              </Form.Group>

              {formErrors.length ? 
                    <Alert variant="danger">Could not add review. Please try again later </Alert> 
                    : null}

              {saved ?
                    <Alert variant="success">
                      <Alert.Link href="/">Tripcard Updated! {' '} Explore</Alert.Link>
                    </Alert>        
                    : null }

            <div className="text-center">
              <Button className="mb-2" 
                      size="sm"
                      variant="primary" 
                      type="submit"
                      onClick={handleSubmit}>
                Save Tripcard
              </Button>
            </div>
          </Form>
      </Card>
    </div>
  );
}


export default UpdateTripcardForm;