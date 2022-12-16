import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import Alert from "../common/Alert";
import UserContext from "./UserContext";

/** Signup form.
 * 
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 * 
 * Routes -> SignupForm -> Alert
 * 
 * Routed as /signup 
 */

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
                                    username: "",
                                    password: "",
                                    first_name: "",
                                    last_name: "",
                                    email: ""
                                });

  console.debug("SignupForm", 
                "signup=", 
                typeof signup, 
                "currentUser=",
                currentUser,
                "formData=", 
                formData, 
                "formErrors", 
                formErrors);


  /** Handle form submit:
   * Calls signup func prop and, if successful, redirect to /destinations.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    
      if (result.success) {
        navigate("/") 
        } else {
       setFormErrors(result.errors);
      }
  }

  /** Update form data field  */

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(data => ({ ...data, [name]: value }));
    setFormErrors([]);
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3 text-center">Sign Up</h3>
        <Card className="card">
          <Card.Body className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="label" htmlFor="username">Username</label>
                  <input name="username"
                          className="form-control"
                          value={formData.username}
                          onChange={handleChange}
                          />
              </div>
              <div className="form-group mb-2">
                <label className="label" htmlFor="password">Password</label>
                  <input name="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                          />
              </div>
              <div className="form-group mb-2">
                <label className="label" htmlFor="first_name">First name</label>
                  <input name="first_name"
                          className="form-control"
                          value={formData.first_name}
                          onChange={handleChange}
                          />
              </div>
              <div className="form-group mb-2">
                <label className="label" htmlFor="last_name">Last name</label>
                  <input name="last_name"
                          className="form-control"
                          value={formData.last_name}
                          onChange={handleChange}
                          />
              </div>
              <div className="form-group mb-2">
                <label className="label" htmlFor="email">Email</label>
                  <input name="email"
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          />
              </div>

              {formErrors.length ? 
                  <Alert type="danger"
                    messages={["Incorrect username or password. Please try again"]} />
                  : null } 


              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button type="submit" 
                        variant="primary"
                        size="lg"
                        onSubmit={handleSubmit}>
                  Submit
                </Button>
              </div>

            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default SignupForm;