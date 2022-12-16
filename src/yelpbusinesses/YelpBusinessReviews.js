import { Card } from 'react-bootstrap';
import { getStars, formatReviewDate } from '../common/Helpers';


/** Shows limited information about a business review from a Yelp user returned from Yelp API
 * 
 * Is rendered on YelpBusinessesDetail page to show a "card" for each review.
 * 
 * YelpBusinessesDetail -> YelpBusinessReview
 * 
 */

const YelpBusinessReviews = ({ reviews }) => {

  const renderReviewList = reviews.map((review, i) => (
      <Card className="YelpReview-card" key={i}>
        <Card.Body>
          <div className="YelpReview-rating">
            <img src={getStars(review)}
                 alt="star rating"
            />
            <p className="YelpReview-date">
              {formatReviewDate(review.time_created)}
            </p>
          </div>

          <div>
            <p className="YelpReview-text">
              {review.text}
              <Card.Link href={review.url}>Read Full Review</Card.Link> 
            </p>
          </div>
        </Card.Body>
      </Card>
  ));

  return (
    <div>{renderReviewList}</div>
  );
};

export default YelpBusinessReviews;