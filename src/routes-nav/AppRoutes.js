import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import DestinationList from "../destinations/DestinationList";

import SearchYelpBusinesses from "../yelpbusinesses/SearchYelpBusinesses";
import YelpBusinessDetail from "../yelpbusinesses/YelpBusinessDetail";
import YelpBusinessReviews from "../yelpbusinesses/YelpBusinessReviews";

import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import UpdateProfileForm from "../auth/UpdateProfileForm";
import UserPage from "../auth/UserPage";

import BusinessList from "../businesses/BusinessList";
import BusinessDetail from "../businesses/BusinessDetail";
import AddReviewForm from "../reviews/AddReviewForm";

import UpdateTripcardForm from "../tripcards/UpdateTripcardForm";
import TripcardList from "../tripcards/TripcardList";
import TripcardDetail from "../tripcards/TripcardDetail";
import Tripcardbusinesses from "../tripcards/Tripcardbusinesses";

import PrivateRoute from './PrivateRoute';

/** Site-wide routes.
 * 
 * Parts of site should only be visible when logged in. Those routes are wrapped by <PrivateRoute> which is an authorization component.
 * 
 * Visiting a non-existent route redirects to the homepage
 */

const AppRoutes = ({ login, signup, tripcard, businesses }) => {
console.debug("Routes", `login=${typeof login}`,
                        `signup=${typeof signup}}`
                      );
        return (
                <div>
                  <Routes>

                    <Route path="/"
                           element={<Homepage />}
                    />

                    <Route path="/signup"
                           element={<SignupForm signup={signup} />}
                    />

                    <Route path="/login"
                           element={<LoginForm login={login} />}
                    />

                    <Route path="/update"
                           element={<PrivateRoute>
                                      <UpdateProfileForm />
                                    </PrivateRoute>}
                    />

                    <Route path="/profile"
                           element={<PrivateRoute>
                                      <UserPage  />
                                    </PrivateRoute>}
                    />

                    <Route  path="/tripcards"
                            element={<PrivateRoute>
                                        <TripcardList />
                                      </PrivateRoute>}
                    />

                    <Route path="/tripcards/:id/update"
                          element={<PrivateRoute>
                                    <UpdateTripcardForm />
                                   </PrivateRoute>}
                    />

                    <Route path="/tripcards/:id"
                           element={ <PrivateRoute>
                                      <TripcardDetail tripcard={tripcard} />
                                     </PrivateRoute>}
                    />

                    <Route path="tripcards/:id/businesses"
                           element={ <PrivateRoute>
                                       <Tripcardbusinesses />
                                     </PrivateRoute>}
                      />

                    <Route path="tripcards/:id/delete/:business_id"
                           element={ <PrivateRoute>
                                        <Tripcardbusinesses />
                                     </PrivateRoute>}
                    />    
                      
                    <Route path="/destinations"
                          element={
                                      <DestinationList />
                                   }                          
                    />

                    <Route path="/businesses"
                          element={<PrivateRoute>
                                      <BusinessList />
                                   </PrivateRoute>}
                    />

                    <Route path="/businesses/:id/reviews"
                           element={<PrivateRoute>
                                      <AddReviewForm />
                                    </PrivateRoute>}
                    />

                    <Route path="/businesses/:id"
                           element={<PrivateRoute>
                                      <BusinessDetail />
                                    </PrivateRoute>}
                    />                 

                    <Route path="api/businesses/:yelp_id/reviews"
                          element={
                                    <YelpBusinessReviews />
                                  }
                    />

                    <Route path="api/businesses/:yelp_id"
                           element={
                                    <YelpBusinessDetail />
                                    }
                    />        

                    <Route path="api/businesses/search"
                           element={
                                      <SearchYelpBusinesses />
                                    }
                    />                         
        
                    <Route path="*"
                          element={<Navigate to="/" />}
                    />
        
                  </Routes>
                </div>
        );
    }

export default AppRoutes;