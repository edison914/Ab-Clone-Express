
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpotsThunk } from '../../store/spot';
import { NavLink, useNavigate } from 'react-router-dom';
import './ManageSpots.css'
function ManageSpots () {
    const sessionUser = useSelector((state) => state.session.user)
    const allSpots = useSelector(state => Object.values(state.spots))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getSpotsThunk())
    },[dispatch])

    const handleUpdateSpot = (spotId) => {
        navigate(`/spots/${spotId}/Update`)
    }

    // const handleDeleteSpot = (e) => {
    //e.preventDefault();
    // return dispatch(sessionActions.login({ credential: 'Demouser', password: 'demouser' }))
    //     .then(closeModal)
    //}

    const ownerSpots = allSpots.filter((spot) => spot.ownerId === sessionUser.id);

    if (!allSpots) {
        return <div>Loading...</div>
    }

    // console.log(sessionUser.id)
    // console.log(ownerSpots)
    return (
        <div>
            <h1>
                Manage spot page
            </h1>
            {ownerSpots.length === 0 &&
                <NavLink to='/spots/newSpot'>Create a new Spot</NavLink>
            }
            <div className="spotlist">
                {ownerSpots.length > 0 &&
                    ownerSpots.map((spot) => (
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
                                    <i className="fas fa-star" />{spot.avgRating ? spot.avgRating.toFixed(1) : 'NEW'}
                                    </div>
                                </div>
                                <div className='spot-price'>
                                    ${spot.price} night
                                </div>
                            </div>

                            <div className='managespot-buttons-container'>
                                <button
                                    className='managespot-button'
                                    type='button'
                                    onClick={() => handleUpdateSpot(spot.id)}
                                >
                                    Update
                                </button>
                                <button
                                    className='managespot-button'
                                    type='button'
                                    //onClick={handleDeleteSpot(spot.id)}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ManageSpots
