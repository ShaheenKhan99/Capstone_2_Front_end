import { useState, useEffect } from "react";

import SearchForm from "../common/SearchForm";
import ReviewCardList from "./ReviewCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import TripcardsApi from "../api/api";

/** Show page with list of reviews.
 * 
 * On mount, loads reviews from API.
 * Re-loads filtered reviews on submit from search form;
 * 
 * This is routed to at /reviews
 * 
 * Routes -> { ReviewCardList, SearchForm }
 * 
 * ReviewList -> ReviewCardList -> ReviewCard
 */

 const  ReviewList = () => {
  console.debug("ReviewList");

  const [reviews, setReviews] = useState(null);

  useEffect(function getReviewsOnMount() {
    console.debug("ReviewList useEffect getReviewsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads companies */
  async function search(business_id) {
    let reviews = await TripcardsApi.getReviews(business_id);

    setReviews(reviews);
  }

  if (!reviews) return <LoadingSpinner />;
  
  return (
    <div className="ReviewList col-md-8 offset-md-2">
      <div className="text-center">
        <SearchForm searchFor={search} />
      </div>
      
      {reviews.length ? <ReviewCardList reviews={reviews} /> :
        <p className="lead">Sorry, no results were found!</p>
      }
    </div>
  );
}

export default ReviewList;

