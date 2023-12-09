import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsThunk } from '../../store/spot';
import { NavLink } from 'react-router-dom'
import './SpotList.css';



const AllSpotList = () => {
    const allSpots = useSelector(state => state.spots.spots)
    //console.log(`allSpot`, allSpots)

    const dispatch = useDispatch()

    useEffect(() => {
        //console.log(`is spotActions called?`)
        dispatch(getSpotsThunk())

    }, [dispatch])

    if (!allSpots) {
        return <div>Loading...</div>
      }

    return (
        <nav className="spotlist">
            {allSpots.map((spot) => (
                <div key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`}>
                        <img
                             className='spot-img'
                            src={spot.previewImage}
                             title={spot.name}
                             alt={spot.name}
                        />
                    </NavLink>
                    <div className="spot-info">
                        <div className='spot-city-and-rating'>
                            <div>
                            {spot.city}, {spot.state}
                            </div>
                            <div>
                            <i className="fas fa-star" />{spot.avgRating ? spot.avgRating : 'NEW'}
                            </div>
                        </div>
                        <div className='spot-price'>
                            ${spot.price} night
                        </div>
                    </div>
                </div>
            ))}
        </nav>
    );
};

export default AllSpotList
