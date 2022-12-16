import {  useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import UserContext from "../auth/UserContext";
import UpdateProfileForm from "./UpdateProfileForm";
import useToggle from "../hooks/useToggle";
import TripcardCard from "../tripcards/TripcardCard";
import ReviewCardList from "../reviews/ReviewCardList";
import UserProfile from "../auth/UserProfile";
import "./UserPage.css";


/** UserPage displays all information about the user 
 * 
 * It shows all tripcards and reviews
 * 
 * The user can click a button which leads them to update their own profile here
 * 
 * UserPage -> UserProfile -> UpdateProfileForm
*/

const UserPage = ( updateUser ) => {
  const { currentUser } = useContext(UserContext);
  console.debug("currentUser=", currentUser, "currentUser.tripcards=", currentUser.tripcards);
  
  const [isUpdate, setIsUpdate] = useToggle(false);
  
  function tripcardsExist() {

    return (
        <>
          <Container className="UserTripcards container py-3" >
            <h5 className="mt-5">Tripcards for {currentUser.username}</h5>
            
              <Row className="UserTripcards-row row-cols-1 row-cols-md-3 h-2 g-4 ">
                {currentUser.tripcards.map((tripcard) => {
                      return (
                            <Col>
                                <TripcardCard key={tripcard.id}
                                              id={tripcard.id}
                                              user_id={tripcard.user_id}
                                              destination_id={tripcard.destination_id}
                                              username={tripcard.username}
                                              city={tripcard.city}
                                              state={tripcard.state}
                                              country={tripcard.country}
                                              keep_private={tripcard.keep_private}
                                              created_on={tripcard.created_on}
                                  />
                              </Col>
                             )
                    })}
              </Row>
          </Container>
    </>
    )
  };
  
 
  return (
    <>
    <UserProfile />

      <div>
        {isUpdate ? <UpdateProfileForm 
                          updateUser={updateUser}
                          setIsUpdate={setIsUpdate}
                    />
         : null }
      </div>


      <div className="UserTripcards-list mt-2 text-center">
          {currentUser.tripcards.length ? 
              tripcardsExist() : 
              <p>No tripcards yet!</p> 
          }   
      </div>


      <Container>    
        <h5 className="mt-5 mb-3 text-center">Reviews by {currentUser.username}</h5>
          {currentUser.reviews ? 
              <ReviewCardList reviews={currentUser.reviews} /> 
            :  
              <p>No reviews yet!</p>
        }
      </Container> 

    </>
     
)}

export default UserPage;

