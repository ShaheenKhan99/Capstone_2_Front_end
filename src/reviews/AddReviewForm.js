import { useState, useContext } from "react";
import { Card, Button, Alert } from "react-bootstrap";

import TripcardsApi from "../api/api";
import UserContext from "../auth/UserContext";

/** AddReviewForm
 * 
 * Is rendered by BusinessDetail to show form to add a review about business saved in DB.
 * 
 * 
 * Routed at /businesses/:id/reviews
 * 
 *  BusinessDetail -> AddReviewForm
 * 
 */


const AddReviewForm = ({ business }) => {

  const { currentUser } = useContext(UserContext);
  
  const [formData, setFormData] = useState({ 
                                            user_id: "",
                                            username: "",
                                            business_id: "",
                                            business_name: "",
                                            text: "",
                                            rating: "",
                                            created_on: "",
                                            image_url: ""  
                                            });
  const [formErrors, setFormErrors] = useState([]);
  const [review, setReview] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [saved, setSaved] = useState();
  

  async function handleSubmitReview(evt) {
    evt.preventDefault();

    let data = {
              user_id: currentUser.id,
              username: currentUser.username,
              business_id: business.id,
              business_name: business.businessName,
              text: formData.text,
              rating: formData.rating,
              created_on: new Date(),
              image_url: formData.image_url        
      }

    try {
          const review = await TripcardsApi.addReview(business.id, data);
          setReview(review);
          setFormData(data => ({ ...data }));
         } catch (errors) {
          setFormErrors(errors);
          return;
        }
        setFormErrors([]);
        setSaved(true)
        setButtonDisabled(true); 
    } 
  

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(data => ({ ...data, [name]: value }));
    setFormErrors([]);  
  }

  return (
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4">
          <h4 className="text-center mb-3">Add a review for  {business.businessName}</h4>
          <Card className="card" style={{ backgroundColor: '#cad9cc' }}>
            <Card.Body className="card-body">
              <form onSubmit={handleSubmitReview}>

                <div className="form-group mb-3">
                  <label htmlFor="text" className="form-label">Review</label>
                    <textarea name="text"
                              className="form-control"
                              value={formData.text}
                              onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="rating">Rating</label>
                    <select
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                          className="custom-select"
                    >
                      <option disabled>Rating</option>
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                      <option value="2.5">2.5</option>
                      <option value="3">3</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4</option>
                      <option value="4.5">4.5</option>
                      <option value="5">5</option>
                    </select>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="image_url" className="form-label">Image url</label>
                  <input name="image_url"
                       type="url"
                       className="form-control"
                       value={formData.image_url}
                       onChange={handleChange}
                  />
                </div>

            
                  {formErrors.length ? 
                    <Alert variant="danger">
                      <Alert.Link href="/"> Review already added. {' '} Explore other places</Alert.Link>
                    </Alert> 
                    : null}

                  {saved ?
                    <Alert variant="success">Added review {' '}
                      <Alert.Link href="/">Explore</Alert.Link>
                    </Alert>        
                    : null }

                  <div className="d-grid gap-5 d-sm-flex justify-content-center">
                    <Button variant="outline-success"
                            type="submit"
                            size="md"
                            disabled={buttonDisabled}
                            onSubmit={handleSubmitReview}>
                      Submit Review
                    </Button>
                  </div>
                </form>
            </Card.Body>
          </Card>
        </div>
  );
}


export default AddReviewForm;


