import { Container, Row, Col} from "react-bootstrap";
import yelp_logo from "../assets/yelp_logo.png";
import "./Footer.css";


const Footer = () => {

    return(
            <Container className="Footer-credits mt-5">
              <Row>
                <Col sm={6}>
                  <img className="Footer-yelp-icon mb-1 mt-3" src={yelp_logo} alt="logo" />
                  <p className="yelp-credit text-muted">
                    Data provided by {' '}
                      <a className="Footer-yelp-link"
                        href="https://www.yelp.com/fusion"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Yelp Fusion API
                        </a>
                  </p>  
                </Col>

                <Col sm={6}>
                  <p className="Footer-photo-credit text-muted mt-4">
                  Photo by <a href="https://unsplash.com/@jack_anstey?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                              target="_blank"
                              rel="noopener noreferrer">
                  Jack Anstey</a> on {' '}
                  <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                      target="_blank"
                      rel="noopener noreferrer">
                    Unsplash</a>
                  </p> 
                   
                </Col>  
              </Row>
              
              </Container>

          );
  }

  export default Footer;
