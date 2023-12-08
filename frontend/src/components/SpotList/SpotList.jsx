import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsThunk } from '../../store/spot';
import { NavLink } from 'react-router-dom'
import './SpotList.css';



const AllSpotList = () => {
    const allSpots = useSelector(state => state.spots.spots)
    console.log(`allSpot`, allSpots)
    //get all spots in an array

    const dispatch = useDispatch()

    useEffect(() => {
        //console.log(`is spotActions called?`)
        dispatch(getSpotsThunk())

    }, [dispatch])

    if (!allSpots) {
        return <div>Loading...</div>;
      }

    return (
        <nav className="spotlist">
            {allSpots.map((spot) => (
                <div key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`}>
                        <img src={spot.previewImage}
                             alt={spot.name}
                             style={{ width: '100px', height: '100px', margin: '5px' }}
                        />
                    </NavLink>
                    <div className="spot-info">
                        <div>
                        City: {spot.city}
                        </div>
                        <div>
                        Rating: {spot.avgRating}
                        </div>
                        <div>
                        Cost:${spot.price}
                        </div>
                    </div>
                </div>
            ))}
        </nav>
    );
};

export default AllSpotList
