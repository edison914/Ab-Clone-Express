import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetailThunk } from '../../store/spot';
import { useEffect } from 'react';
import ReviewsById from '../Review/ReviewsById';
import './SpotDetail.css';

const SpotDetail = () => {
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots.spotDetail)
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
            <h2>{spot.city}, {spot.state}, {spot.country}</h2>
            <img
                className='spot-img'
                src={spot.SpotImages[0].url}
                title={spot.name}
                alt={spot.name}
            />
            <div className='spot-info'>
                <div className='spot-info-host'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='spot-info-container'>
                    <div className='spot-info-callout'>
                        <div>${spot.price}/night</div>
                        <div><i className="fas fa-star" />{spot.avgRating}</div>
                        <div>{spot.numReviews} reviews</div>
                    </div>
                    <div>
                        <button className='spot-reserve-button' onClick={handleReserveClick}>Reserve</button>
                    </div>

                </div>
            </div>
            <ReviewsById />
        </div>
    )
};

export default SpotDetail
