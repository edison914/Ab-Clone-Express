import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetailThunk } from '../../store/spot';
import { useEffect, useState } from 'react';
import ReviewsById from '../Review/ReviewsById';
import './SpotDetail.css';
import OpenModalButton from  '../OpenModalButton/OpenModalButton'
import PostReviewModal from '../PostReview/PostReviewModal';

const SpotDetail = () => {
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots[spotId])
    const currentUser = useSelector(state => state.session.user)
    const allReviews = useSelector(state => Object.values(state.reviews))
    const reviewsForCurrentSpot = allReviews.filter(review => review.spotId === Number(spotId))
    //console.log(`currentUser`,currentUser)
    //console.log(`spotOnwerId`, spot.Owner.id)
    //console.log(`allSpot`, spot)
    //console.log(spot.SpotImages)
    //console.log(reviewsForCurrentSpot)
    const dispatch = useDispatch()

    const [hasReviewed, setHasReviewed] = useState(false)

    //fetch all the spot details info when loading a page
    useEffect(() => {
        //console.log(`is spotActions called?`)
        dispatch(getSpotDetailThunk(spotId))

    }, [dispatch, spotId])

    //check the reviews to see if the current user id match one of the review userId
    useEffect(() => {
        if (currentUser && spot && reviewsForCurrentSpot) {
            if (hasReviewed) {
                return;
            }

            reviewsForCurrentSpot.forEach((review) => {
                if (review.userId === currentUser?.id) {
                    setHasReviewed(true);
                }
            });
        }
    }, [currentUser, spot, reviewsForCurrentSpot, hasReviewed]);

    if (!spot) {
        return <div>Loading...</div>
      }

    const handleReserveClick = () => {
        alert (`Feature coming soon`)
    }


    return (
        <div>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            <div className='spotdetail-pictures-container'>
                <div className='spotdetail-right-picture-container'>
                    {spot.SpotImages && <img
                        className='spotdetail-img-left'
                        src={spot.SpotImages[0]?.url}
                        title={spot.name}
                        alt={spot.name}
                    />}
                </div>
                <div className='spotdetail-left-pictures-container'>
                    {spot.SpotImages.length > 0 && <img
                        className='spotdetail-img-right'
                        src={spot.SpotImages[1]?.url}
                        title={spot.name}
                        alt={spot.name}
                    />}
                    {spot.SpotImages.length > 1 && <img
                        className='spotdetail-img-right'
                        src={spot.SpotImages[2]?.url}
                        title={spot.name}
                        alt={spot.name}
                    />}
                    {spot.SpotImages.length> 2 && <img
                        className='spotdetail-img-right'
                        src={spot.SpotImages[3]?.url}
                        title={spot.name}
                        alt={spot.name}
                    />}
                    {spot.SpotImages.length> 3 && <img
                        className='spotdetail-img-right'
                        src={spot.SpotImages[4]?.url}
                        title={spot.name}
                        alt={spot.name}
                    />}
                </div>
            </div>


            <div className='spotdetail-info'>
                <div className='spotdetail-info-host'>
                {spot.Owner && <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>}
                    <p>{spot.description}</p>
                </div>
                <div className='spotdetail-info-container'>
                    <div className='spotdetail-info-callout'>
                        <div>${spot.price}/night</div>
                        <div>
                            <i className='fas fa-star' />
                            {spot.avgRating ? spot.avgRating.toFixed(1) : 'NEW'}
                            {spot.numReviews > 0 && (
                                <>
                                    <span> · </span>
                                    {spot.numReviews === 1 ? '1 Review': `${spot.numReviews} Reviews`}
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <button className='spotdetail-reserve-button' onClick={handleReserveClick}>Reserve</button>
                    </div>

                </div>
            </div>
            <div>
                <h3 className='spotdetail-rating-dup'>
                    <i className='fas fa-star' />
                    {spot.avgRating ? spot.avgRating.toFixed(1) : 'NEW'}
                    {spot.numReviews > 0 && (
                        <>
                            <span> · </span>
                            {spot.numReviews === 1 ? '1 Review': `${spot.numReviews} Reviews`}
                        </>
                    )}
                </h3>
            </div>
            <div>
                {/*
                check if currentUser is Login
                check if currentUser has already review the spot using useEffect to loop through reviewArr and setReview State
                check if currentUser Id not equal to Spot Owner Id
                */}
                {currentUser && !hasReviewed && currentUser?.id !== spot?.Owner?.id && (
                    <OpenModalButton
                        modalComponent={<PostReviewModal spotId={ spotId} />}
                        buttonText='Post Your Review'
                    />
                )}
            </div>
            <ReviewsById spotId={ spotId }/>
        </div>
    )
};

export default SpotDetail
