import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Alert, Container, Row, Col, Card, Button } from "react-bootstrap"; 
  
import TripcardsApi from "../api/api";
import ReviewCardList from "../reviews/ReviewCardList";
import AddReviewForm from "../reviews/AddReviewForm";
import { getStars } from "../common/Helpers";

import useToggle from "../hooks/useToggle";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import "./BusinessDetail.css";


/** Business Detail page
 * 
 * Is rendered by BusinessList to show information about business saved in DB.
 * 
 * Receives add and delete func props from parent, which are called on add or delete
 * 
 * Routed at /businesses/:id
 * 
 * Routes: { BusinessCard, ReviewCardList }
 * 
 * Route: BusinessCard -> BusinessDetail
 * 
 */

 const BusinessDetail = ( addReview ) => {
    const { id } = useParams();

    console.debug("BusinessDetail", "id=", id);

    const { currentUser, 
            hasAddedTripcardBusiness,
            addBusinessToTripcard,
            deleteBusinessFromTripcard } = useContext(UserContext);
    
    
    const [business, setBusiness] = useState(null);
    const [tripcard, setTripcard] = useState(null);
    const [added, setAdded] = useState(hasAddedTripcardBusiness);
    const [isAddReview, setIsAddReview] = useToggle(false);
    const [businessReviews, setBusinessReviews] = useState([]);

    const [deleteTripcardBusiness, setDeleteTripcardBusiness] = useState();
    const [tripcardError, setTripcardError] = useState(false);
    const [show, setShow] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [deleted, setDeleted] = useState(false);


    useEffect(function getBusinessAndReviewsForUser() {
      async function getBusiness() {
        setBusiness(await TripcardsApi.getBusiness(id));
        setAdded(await hasAddedTripcardBusiness(id));
        setBusinessReviews(await TripcardsApi.getReviews(id))
      }
     getBusiness();
    }, [id, hasAddedTripcardBusiness]);


    if (!business) return <LoadingSpinner />;


  /** Write review for business */
    async function handleAddReviewClick(evt){
      evt.preventDefault();
      setIsAddReview(true);
    }


  /** Add business to tripcard */
  async function handleAdd(evt) {
    evt.preventDefault();

    // Fetch user tripcard for current destination
    const tripcard = getTripcardForUser();
    setTripcard(tripcard);
      
      try {
            await addBusinessToTripcard(tripcard.id, business.id);
            setShow(true);
            setAdded(true);
            setButtonDisabled(true);
          } catch (error) {
              console.error("Could not add business to tripcard", error.message);
           }   
        }
 

  /** Handle remove business from tripcard */

  async function handleRemove(evt) {
    evt.preventDefault();
    const tripcard = getTripcardForUser();
    setTripcard(tripcard);

      setDeleteTripcardBusiness(await deleteBusinessFromTripcard(tripcard.id, id));
      setAdded(false);
      setShow(false);
      setDeleted(true); 
    }


  // Get correct tripcard for user. If tripcard does not exist, prompt user to create tripcard
  function getTripcardForUser() {
      let tripcardRes = currentUser.tripcards.filter(tripcard => tripcard.city === business.city);
      if (!tripcardRes.length){
        setTripcardError(true);
        return;
      } else {
      const tripcard = tripcardRes[0];
      return tripcard;
     }
    }  

  // If business is already added to tripcard
  function tripcardBusinessAdded () {
    return (
              <div className="py-5">
                <Button variant="outline-danger" 
                        disabled={buttonDisabled}
                        onClick={handleRemove}>
                  Delete
                </Button>
              </div>    
            )
     }
 
   // if business is not added to tripcard
   function tripcardBusinessNotAdded() {
       return (
               <div className="py-5 text-center">
                 <Button variant="outline-success"
                         size="sm" 
                         disabled={buttonDisabled}
                         onClick={handleAdd}>
                     Add
                 </Button>
               </div>
             )
           }
    
           
  // JSX if tripcard does not exist
  function tripcardDoesNotExist() {
    return (
            <div>
              <Button className="BusinessDetail-tripcard"
                      size="md"
                      variant="danger"           
                      href="/destinations">
                  Please create a tripcard first!
              </Button> 
            </div>
          )
       }
    

    return (
        <>
          <div>
            <Container className="BusinessDetails-container py-3" >
              <Card>
                <Card.Body>
                    <Row>
                      <div className="BusinessDetail-deletedAlert text-center">
                        {deleted ? 
                          <Alert variant="danger">
                            <Alert.Link href="/">Deleted! Explore other places</Alert.Link> 
                            </Alert>
                          : null } 
                        </div>
                      
                        <div>
                          {show ?
                            <Alert variant="success">
                              <Alert.Link href="/">Added!   Explore other places</Alert.Link> 
                            </Alert>
                          :
                            null } 
                        </div>

                      <Col sm={5}>
                        <Card.Img src={business.imageURL} 
                                alt='...' 
                                variant="top"
                                className="BusinessDetail-image" />
                      </Col>

                      <Col sm={5}>
                        <Card.Title>{business.businessName}</Card.Title>
                          <Card.Text>{business.address1}</Card.Text>
                          <Card.Text>{business.city}, {business.state} {business.country}</Card.Text>
                          <Card.Text>{business.zipcode}</Card.Text>
            
                          {business.phone && <Card.Text>{business.phone}</Card.Text>}
            
                          <Card.Text>Yelp rating: {business.rating}</Card.Text>
            
                          <Card.Text>Yelp reviews: {business.yelpReviewCount}</Card.Text>    
            
                          {business.categoryName && 
                              <Card.Text>{business.categoryName}</Card.Text>}
     
                          <Card.Link href={business.url} 
                                target="_blank">
                             See more on Yelp
                          </Card.Link>  
                      </Col>

                      <Col sm={2}>
                        {tripcardError ?
                          tripcardDoesNotExist()
                        :
                          null } 

                        {added ?
                            tripcardBusinessAdded() 
                          : tripcardBusinessNotAdded()
                        }

                        <div className="py-3 text-center">
                            <Button variant="outline-secondary"
                                    size="sm" 
                                    onClick={handleAddReviewClick}>
                              Write a review
                            </Button>
                        </div>

                      </Col>
                      
                      </Row>
                  </Card.Body>
                </Card>
                  
              </Container>
            </div>

            <div className="addReview-container">
              {isAddReview ? <AddReviewForm  
                                          key={id}
                                          id={id}
                                          addReview={addReview}
                                          setIsAddReview={setIsAddReview}
                                          business={business}
                          /> 
                        : null }
            </div>
        
          <Container className="Reviews-card container mt-3">
              
                {business.reviews.length ? 
                    ( 
                      <>
                        <h6 className="text-center">Reviews for {business.businessName}</h6>
                        <div className="BusinessReviews-list">
                          <ReviewCardList reviews={business.reviews} />
                        </div> 
                      </>
                    )
                : <h6 className="text-center">No reviews yet!</h6>
                }
            </Container>
    </>
  );
  
}

export default BusinessDetail;