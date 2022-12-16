import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import AppRoutes from "./routes-nav/AppRoutes";
import TripcardsApi from "./api/api";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./common/LoadingSpinner";
import { decodeToken } from "react-jwt";


// Key name for storing token in localStorage for "remember me" re-login 
export const  TOKEN_STORAGE_ID = "tripcards-token";


/** Tripcards application 
 * 
 * - infoLoaded: has user data been pulled from API?
 *  (this manages spinner for "loading...")
 * 
 * - currentUser: user obj from API. This becomes the canonical way to tell if someone is logged in. This is passed around via context throughout the app.
 * 
 * -token: for logged in users, this is their authentication JWT. 
 * Is required to be set for most API calls. This is initially read from localStorage and synced to there via the useLocalStorage hook.
 * 
 * App -> Routes
*/


const App = () => {
  const [infoLoaded, setInfoLoaded] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const [tripcardIds, setTripcardIds] = useState(new Set([]));

  const [tripcards, setTripcards] = useState(new Set([]));

  const [deletedTripcard, setDeletedTripcard] = useState([]);

  const [tripcard, setTripcard] = useState(null);

  const [currentUserTripcards, setCurrentUserTripcards] = useState();

  const [tripcardError, setTripcardError] = useState();

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug("App", 
                "infoLoaded=", 
                infoLoaded, 
                "currentUser=", 
                currentUser, 
                "token=", 
                token);

  // Load user info from API. Until a user is logged in and they have a token, this should not run. It only needs to re-run when a user logs out, so the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("app useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { id } = decodeToken(token);

          // put the token on the Api class so it can use it to call the API.
          TripcardsApi.token = token;
          let currentUser = await TripcardsApi.getCurrentUser(id);

          setCurrentUser(currentUser);

          setTripcardIds(new Set(currentUser.tripcards));

          setTripcards(new Set(currentUser.tripcards));

          setCurrentUserTripcards(currentUser.tripcards);

        } catch (err) {
          console.error("app loadUserInfo: problem loading", err);

          setCurrentUser(null);
        }
      }
      // setInfoLoaded(true);
    }
    
    // set infoLoaded to false while async getCurrentuser runs; once the data is fetched or even if an error happens, this will be set back to false to control the spinner.

    setInfoLoaded(false);
    getCurrentUser();
    setInfoLoaded(true);

  }, [token]);


  /** Handles site-wide signup
   * 
   * Automatically logs them in (set token) upon signup.
   * 
   * Await this function and check return value
   */

  async function signup(signupData) {
    try {
      let token = await TripcardsApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
        console.error("signup failed", errors);
        return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   * 
   * Make sure to await this function and check its return value.
   */

   async function login(loginData) {
    try {
      let token = await TripcardsApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  
 /** Checks whether user has created tripcard for specific destination */ 
 function hasCreatedTripcard(destination_id){
   if (!currentUser.tripcards) return false;
    let tripcards = currentUser.tripcards;
    if (tripcards.length){
    const tripcard = tripcards.filter(tripcard => tripcard.destination_id === destination_id);
    if (tripcard.length)
      return true;
  }
}

/** Checks if user has created tripcard for city */
  function hasCreatedTripcardWithCity(city){
    let tripcards = currentUser.tripcards; 
      const tripcard = tripcards.filter(tripcard => tripcard.city === city);
      if (tripcard.length) 
      return true;
  }


  /** Create a tripcard for a destination: make API call and update set of tripcard IDs */

  async function createTripcard(destination_id, data) {
    if (hasCreatedTripcard(destination_id)) return;

    try { 
          const tripcard = await TripcardsApi.createTripcard(currentUser.id, destination_id, data);
          setTripcard(tripcard);
          setTripcardIds(new Set([...tripcardIds, destination_id]));
          setTripcards([...tripcards, tripcard]);
        } catch (errors) {
          console.error("Could not create tripcard", errors);
          return { success: false, errors};
        }    
    }


  /** Deletes specific tripcard for user */

    async function removeTripcard(evt, id) {
      evt.preventDefault();
      try {
            setDeletedTripcard(await TripcardsApi.deleteTripcard(id))
            setTripcards(tripcards.filter((tripcard) => { 
              return tripcard.id !== id;
          })
        )   
          setCurrentUserTripcards(currentUser.tripcards.filter((tripcard) => {
            return tripcard.id!== id;
          })
        )          
          } catch (err) {
            console.error("Could not delete", err.message);
          }
      }


  /** Checks if user has added specific business to tripcard */
  function hasAddedTripcardBusiness(business_id){
    if (!currentUser.tripcards) return false;

    const tripcard = currentUser.tripcards.filter(tripcard => 
      tripcard.business_id === business_id);
      if(!tripcard.length) {
        setTripcardError(true);
        console.log("No tripcard exists")
        return;
      } else {
        setTripcard(tripcard);
        let tripcardbusinesses = tripcard.tripcardbusinesses;
        if (tripcardbusinesses) {
          const tripcardbusiness = tripcardbusinesses.filter(t => t.business_id === business_id)
          if (tripcardbusiness.length)    
         return true;
        }
      }
    }


  /** Add a business to specific tripcard: make API call and save business to tripcard. */

  async function addBusinessToTripcard(tripcard_id, business_id){
    if (hasAddedTripcardBusiness(business_id)) return;
    try {
      await TripcardsApi.addBusinessToTripcard(tripcard_id, business_id)
    } catch (errors) {
      console.error("failed to add business to tripcard", errors);
      return { success: false, errors };
    }
  }

  /** Remove a business from a specific tripcard */
  async function deleteBusinessFromTripcard(tripcard_id, business_id) {
    try {
          await TripcardsApi.removeBusinessFromTripcard(tripcard_id, business_id);
        } catch (err) {
          console.error("Could not delete", err.message);
        }
  }

  
  if (!infoLoaded) return <LoadingSpinner />;
 
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, 
                                      setCurrentUser,
                                      hasCreatedTripcard,
                                      hasCreatedTripcardWithCity,
                                      tripcard,
                                      setTripcard,
                                      tripcardIds,
                                      createTripcard,
                                      removeTripcard,
                                      tripcards,
                                      setTripcards,
                                      hasAddedTripcardBusiness,
                                      addBusinessToTripcard,
                                      deleteBusinessFromTripcard    
                                  }}
      >
        <div className="App">
          <Navigation logout={logout} />
          <AppRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>                                
    </BrowserRouter>
  );
}


export default App;

