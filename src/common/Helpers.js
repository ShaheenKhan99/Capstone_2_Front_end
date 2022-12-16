import zeroStar from '../assets/small_ratings/small_0.png';
import oneStar from '../assets/small_ratings/small_1.png';
import oneHalfStar from '../assets/small_ratings/small_1_half.png';
import twoStars from '../assets/small_ratings/small_2.png';
import twoHalfStars from '../assets/small_ratings/small_2_half.png';
import threeStars from '../assets/small_ratings/small_3.png';
import threeHalfStars from '../assets/small_ratings/small_3_half.png';
import fourStars from '../assets/small_ratings/small_4.png';
import fourHalfStars from '../assets/small_ratings/small_4_half.png';
import fiveStars from '../assets/small_ratings/small_5.png';
import moment from 'moment';

const getStars = business => {
  const ratingToStars = {
    '0': zeroStar,
    '1': oneStar,
    '1.5': oneHalfStar,
    '2': twoStars,
    '2.5': twoHalfStars,
    '3': threeStars,
    '3.5': threeHalfStars,
    '4': fourStars,
    '4.5': fourHalfStars,
    '5': fiveStars
  };

  return ratingToStars[business.rating];
};


// Format review date into Month, Day Year
// Input format: "2019-05-26 18:54:30"
const formatReviewDate = date =>
  moment(date, 'YYYY-MM-DD HH:mm:ss').format('MMM DD, YYYY');


// Format created_on date for tripcard into Month, Day, Year
// Input format: "2022-12-01T01:51:07.802Z"
const formatCreatedOnDate = date =>  
  moment(date, "YYYY-MM-DD hh:mm:ss+ZZ").format("MMMM DD YYYY");


export { getStars, formatReviewDate, formatCreatedOnDate };