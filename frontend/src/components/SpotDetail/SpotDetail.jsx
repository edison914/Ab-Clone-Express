const SpotDetail = () => {
    // const allSpots = useSelector(state => state.spots.spots)
    // //console.log(`allSpot`, allSpots)

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     //console.log(`is spotActions called?`)
    //     dispatch(getSpotsThunk())

    // }, [dispatch])

    // if (!allSpots) {
    //     return <div>Loading...</div>
    //   }

    // return (
    //     <nav className="spotlist">
    //         {allSpots.map((spot) => (
    //             <div key={spot.id}>
    //                 <NavLink to={`/spots/${spot.id}`}>
    //                     <img
    //                          className='spot-img'
    //                         src={spot.previewImage}
    //                          title={spot.name}
    //                          alt={spot.name}

    //                     />
    //                 </NavLink>
    //                 <div className="spot-info">
    //                     <div>
    //                     {spot.city}, {spot.state}
    //                     </div>
    //                     <div>
    //                     Rating: {spot.avgRating ? spot.avgRating : 'NEW'}
    //                     </div>
    //                     <div>
    //                     ${spot.price} night
    //                     </div>
    //                 </div>
    //             </div>
    //         ))}
    //     </nav>
    // );
};

export default SpotDetail
