import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getReviewsByIdThunk } from "../../store/review";
import './ReviewsById.css';
import OpenModalButton from  '../OpenModalButton/OpenModalButton'
import DeleteReviewModal from '../DeleteReview/DeleteReviewModal';

const ReviewsById = ({spotId, setHasReviewed}) => {

    const allReviews = useSelector(state => Object.values(state.reviews))
    const reviews = allReviews.filter(review => review.spotId === Number(spotId))
    const spotOwnerId = useSelector(state => state.spots[spotId].ownerId)
    //console.log(spotOwnerId)
    const currentUserId= useSelector(state => state.session.user?.id)
    //console.log(`current userId`, currentUserId)
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

    //console.log(`current review Id`, sortedReviews[0].id)

    //return the reviews when found
    return (
        <div>
            {sortedReviews.map(review => (
                    <div className='reviewsById-review-container' key={review.id}>
                        <div>{review.User.firstName}</div>
                        <div>{new Date(review.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
                        <div>{review.review}</div>
                        <div>
                            {currentUserId === review?.User?.id && (
                            <OpenModalButton
                                modalComponent={<DeleteReviewModal reviewId={review.id} spotId= {spotId} setHasReviewed={setHasReviewed}/>}
                                buttonText='Delete'
                            />
                            )}
                        </div>
                    </div>
            ))}
        </div>
    )
};

export default ReviewsById
