import { Container } from "react-bootstrap";
import "./NotFound.css";

const NotFound = () => {
    return (
        <Container className="NotFound-container">
          <div className="NotFound-card row">
            <div className="col-md-12">
              <h3 className="text-center">Oops! Looks like this is not what you are searching for..</h3>
            </div>
          </div>
        </Container>
  );
}

export default NotFound;