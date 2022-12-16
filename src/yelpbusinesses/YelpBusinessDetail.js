import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

import TripcardsApi from "../api/api";
import { getStars } from '../common/Helpers';
import YelpBusinessReviews from "./YelpBusinessReviews";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

import "./YelpBusinessDetail.css";


/** YelpBusinessDetail page
 * 
 * Is rendered by Business to show detailed information about business fetched from Yelp API.
 * 
 * Receives add  func props from parent, which is called on add. 
 * 
 * It checks if tripcard for the destination exists otherwise directs user to first create a tripcard. 
 * 
 * Routed at api/businesses/:yelp_id
 * 
 * Route: YelpBusiness -> YelpBusinessDetail
 * 
 */

const YelpBusinessDetail = () => {
  const { yelp_id } = useParams();

  console.debug("YelpBusinessDetail", "yelp_id=", yelp_id);

  const { currentUser, 
          hasAddedTripcardBusiness,
          addBusinessToTripcard, } = useContext(UserContext);

  const [business, setBusiness] = useState();
  const [tripcard, setTripcard] = useState();
  const [tripcardError, setTripcardError] = useState(false);
  const [show, setShow] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [tripcardBusiness, setTripcardBusiness] = useState();
  
  console.debug("currentUserTripcards=", currentUser.tripcards);
  

  const [dbBusiness, setDBBusiness] = useState({
                                          yelp_id:"",
                                          business_name:"",
                                          address1:"",
                                          address2:"",
                                          city:"",
                                          state:"",
                                          country:"",
                                          zip_code:"",
                                          latitude:"",
                                          longitude:"",
                                          phone:"",
                                          image_url:"",
                                          url:"",
                                          rating:"",
                                          review_count:"",
                                          category_name:"",
                                          category_id:"",
                                          destination_id:""
                                      });
  
  const [yelpReviews, setYelpReviews] = useState([]);
   

  useEffect(function getYelpBusinessDetailsAndReviews(){
    async function getBusinessDetails() {
      setBusiness(await TripcardsApi.getBusinessDetails(yelp_id));
      setYelpReviews(await TripcardsApi.getYelpReviews(yelp_id));
    }
    getBusinessDetails();
  }, [yelp_id])

  if (!business) return <LoadingSpinner />;


  // handle add business to tripcard click
  async function  handleSubmit(evt){
    evt.preventDefault();
    
    // wait to get business from DB 
    const tripcardBusiness = await getCorrectBusiness();
    setTripcardBusiness(tripcardBusiness);
   
    // get correct tripcard for destination
    let tripcardRes = getTripcardForUser();
    const tripcard = tripcardRes[0];
    setTripcard(tripcard);

    // add business to tripcard
    try {
        const result = await addBusinessToTripcard(tripcard.id, tripcardBusiness.id)
        console.log("addBusinesstotripcardresult", result);

        setShow(true);
        setButtonDisabled(true);
        } catch (error) {
          console.error(error.message);
          return;
         }  
    } 


    // add business from Yelp Api to Db
    async function addYelpBusinessToDB() {
          let data = {
            yelp_id: business.yelp_id,
            business_name: business.business_name,
            address1: business.address1,
            address2:business.address2,
            city:business.city,
            state:business.state,
            country:business.country,
            zip_code:business.zip_code,
            latitude:business.latitude,
            longitude:business.longitude,
            phone:business.phone,
            image_url:business.image_url,
            url:business.url,
            rating:business.rating,
            yelpReview_count:business.review_count,
            category_name:business.sub_category
          }
        
        try {
            const response = await TripcardsApi.addBusinessToDB(data);
              setDBBusiness(response)
              return response;
            } catch (err) {
              console.error(err.message)
          }  
    }

  // get business from DB or add to DB and then fetch
  async function getCorrectBusiness() {
    let dbBusiness;
    let result = await getDBBusinessForUser();

    if (result){
      dbBusiness = result;
    } else {
      dbBusiness = await addYelpBusinessToDB();
      setDBBusiness(dbBusiness);      
    }
    return dbBusiness;
  }
  
  // Fetch business from DB
  async function getDBBusinessForUser(){
    let city = business.city;
    let yelp_id = business.yelp_id;
    try {
      let resultRes = await TripcardsApi.getBusinesses(city, yelp_id);
      let result = resultRes[0];
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  // Get correct tripcard for user. If tripcard does not exist, prompt user to create tripcard
  function getTripcardForUser() {
        const city = business.city; 
        let tripcards = currentUser.tripcards;
        const tripcard = tripcards.filter(tripcard => tripcard.city === city);
        
        if (!tripcard.length) {
          setTripcardError(true);
          return;
        } else {
          return tripcard;
        }
      }  

  // JSX if tripcard exists    
  function tripcardExists () {
    return (
      <div className="py-5">
        <Button variant="outline-success" 
                type="submit"
                disabled={buttonDisabled}
                onClick={handleSubmit}>
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
        <Container className="YelpBusinessDetail-container py-3">
              <Card className="YelpBusinessYelpDetail">
                <Card.Body>       
                  {show ?
                      <Alert variant="success">
                        <Alert.Link href="/">Added!   Explore other places</Alert.Link> 
                      </Alert>
                    :
                      null } 

                   <Row className="YelpBusinessDetail-details">
                      <Col sm={5}>
                        <Card.Link href={business.image_url} target="_blank">
                          <Card.Img variant="top" 
                                    src={business.image_url}
                                    className="YelpBusinessDetail-image"
                        />
                        </Card.Link>
                      </Col>

                      <Col sm={4} className="YelpBusinessDetail-info px-3">
                        <Card.Title className="YelpBusinessDetail-title">
                          {business.business_name}
                        </Card.Title>
                        <Card.Text className="lh-1">{business.address1}</Card.Text>
                        <Card.Text className="lh-1">{business.city}, {business.state}, {business.country} {business.zip_code}</Card.Text>
                        <Card.Text className="lh-1">Phone: {business.phone}</Card.Text>
                        <Card.Text className="lh-1">Category: {business.sub_category}</Card.Text> 
                        <Card.Text className="lh-1">Yelp reviews: {business.review_count}</Card.Text>
                          <div className="BusinessYelpDetail-starRating mb-2">
                            <img src={getStars(business)} alt="star rating" />
                          </div> 

                        <Card.Link href={business.url} 
                                   target="_blank">
                          See more on Yelp
                        </Card.Link>
                  
                      </Col> 

                      <Col sm={3} className="YelpBusinessDetail-addButton text-center">
                  
                        {tripcardError ?
                        tripcardDoesNotExist() : tripcardExists() }
                 
                      </Col>   
                    </Row>
                  </Card.Body>  
                </Card>  
              </Container>

              <Container>
                 <YelpBusinessReviews reviews={yelpReviews} />
              </Container>
          </>
  );
}

export default YelpBusinessDetail;