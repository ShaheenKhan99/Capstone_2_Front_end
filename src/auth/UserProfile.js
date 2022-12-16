import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";

import UserContext from './UserContext';
import "./UserProfile.css";


/** UserProfile displays information/stats about the user 
 * 
 * The user can click a button which leads them to update or delete their own profile here
 * 
 * UserPage -> UserProfile -> UpdateProfileForm 
 * 
*/

const UserProfile = () => {

  const { currentUser } = useContext(UserContext);

  return (
        <div>
          <Container className="UserProfile-container py-3">
                <Card className="UserProfile-card">
                  <Card.Body className="UserProfileCardBody text-center">
                    <Row className="justify-content-center align-items-center">
                      <Col sm="7">
                        <Card.Title>Username: {`${currentUser.username}`}</Card.Title>
                          <Card.Subtitle className="mb-3">
                           {`${currentUser.firstName} ${currentUser.lastName}`} 
                          </Card.Subtitle>
                          <div className="pb-2 mb-2">
                            <Link to="/update" type="ProfileForm" className="text-center">
                              <Button variant="outline-dark" 
                                      to="/update">
                                  Edit profile
                              </Button>
                            </Link>
                          </div>
                      </Col>

                      <Col sm="5">
                      <div className="UserProfile-stats p-2 mb-2" >
                        <div className="d-flex justify-content-center">
                         
                          <div className="mx-3">
                            <Card.Text className="mb-1 h5">{currentUser.tripcards.length}</Card.Text>
                            <Card.Text className="small text-muted mb-0">Tripcards</Card.Text>
                          </div>

                          <div className="px-3">
                            <Card.Text className="mb-1 h5">{currentUser.reviews.length}</Card.Text>
                            <Card.Text className="small text-muted mb-0">Reviews</Card.Text>
                          </div>

                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="UserProfile-About">
                    <p className="lead text-muted mb-1 text-center">About</p>
                      <div className="UserProfile-bio p-4">
                        {currentUser.bio ? 
                          <Card.Text className="mb-1">{`${currentUser.bio}`}</Card.Text>
                        :
                          <Card.Text className="mb-1">No bio yet</Card.Text>
                        }
                      </div>
                    </div>
              </Card.Body>
            </Card>
      </Container>
    </div>
  );
}

export default UserProfile;

   

                
                
            
                  
                