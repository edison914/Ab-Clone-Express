import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getReviewsByIdThunk } from "../../store/review";
import './ReviewsById.css';

const ReviewsById = ({spotId}) => {

    const reviews = useSelector(state => Object.values(state.reviews))
    //console.log(reviews)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`is action called?`)
        dispatch(getReviewsByIdThunk(spotId))

    }, [dispatch, spotId])

    if (!reviews) {
        return <div>Loading...</div>
    }

    const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div>
            {sortedReviews.map(review => (
                    <div className='reviewsById-review-container' key={review.id}>
                        <div>{review.User.firstName}</div>
                        <div>{new Date(review.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
                        <div>{review.review}</div>
                    </div>
            ))}
        </div>
    )
};

export default ReviewsById
