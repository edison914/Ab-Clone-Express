import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getReviewsByIdThunk } from "../../store/review";
import './ReviewsById.css';

const ReviewsById = ({spotId}) => {

    const allReviews = useSelector(state => Object.values(state.reviews))
    const reviews = allReviews.filter(review => review.spotId === Number(spotId))
    const spotOwnerId = useSelector(state => state.spots[spotId].ownerId)
    //console.log(spotOwnerId)
    const currentUserId= useSelector(state => state.session.user?.id)
    //console.log(currentUserId)
    const dispatch = useDispatch();

    //if reviews found, sort them from most recent to old
    const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    useEffect(() => {
        //console.log(`is action called?`)
        dispatch(getReviewsByIdThunk(spotId))

    }, [dispatch, spotId])

    //loading page for waiting for API fetch and update states
    if (!reviews) {
        return <div>Loading...</div>
    }

    //no reviews and currentUser is not the owner, render below
    if (reviews.length === 0 && currentUserId !== spotOwnerId) {
        return <div>Be the first to post a review!</div>
    }



    //return the reviews when found
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
