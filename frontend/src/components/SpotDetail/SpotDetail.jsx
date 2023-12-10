import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetailThunk } from '../../store/spot';
import { useEffect } from 'react';
import ReviewsById from '../Review/ReviewsById';
import './SpotDetail.css';

const SpotDetail = () => {
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots[spotId])
    //console.log(`allSpot`, spot)
    //console.log(spot.SpotImages)
    const dispatch = useDispatch()

    useEffect(() => {
        //console.log(`is spotActions called?`)
        dispatch(getSpotDetailThunk(spotId))

    }, [dispatch, spotId])

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
            {spot.SpotImages && <img
                className='spotdetail-img'
                src={spot.SpotImages[0]?.url}
                title={spot.name}
                alt={spot.name}
            />}
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
            <ReviewsById spotId={ spotId }/>
        </div>
    )
};

export default SpotDetail
