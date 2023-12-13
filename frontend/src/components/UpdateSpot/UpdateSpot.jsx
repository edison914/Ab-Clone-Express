import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams} from 'react-router-dom'
import { UpdateSpotThunk} from '../../store/spot'
import './UpdateSpot.css'
import { getSpotsThunk } from '../../store/spot';
function UpdateSpot () {

    const {spotId} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allSpots = useSelector(state => Object.values(state.spots))
    //console.log(allSpots)
    const selectedSpot = allSpots.find(spot => spot.id === Number(spotId))
    //console.log(`spotId from useParam`, Number(spotId))
    //console.log(selectedSpot)

    useEffect(() => {
        dispatch(getSpotsThunk())
    },[dispatch])

    const [country, setCountry] = useState(selectedSpot?.country);
    const [address, setAddress] = useState(selectedSpot?.address)
    const [city, setCity] = useState(selectedSpot?.city);
    const [state, setState] = useState(selectedSpot?.state);
    const [latitude, setLatitude] = useState(selectedSpot?.lat);
    const [longitude, setLongitude] = useState(selectedSpot?.lng);
    const [description, setDescription] = useState(selectedSpot?.description);
    const [spotName, setSpotName] = useState(selectedSpot?.name);
    const [price, setPrice] = useState(selectedSpot?.price);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        //createa new obj when form is submmitted
        const spotData = {
                address,
                city,
                state,
                country,
                lat: latitude,
                lng: longitude,
                name: spotName,
                description,
                price
            }

        if (description.length < 30) {
            setErrors({ description: 'Description must be at least 30 characters.' });
            return;
        }

        let res = await dispatch(UpdateSpotThunk(spotData, spotId))
            .catch(async (res) => {
            const data = await res.json();
            console.log(`data`,data)
            if (data && data.message) {
                setErrors(data.errors);
                console.log(`errors`, errors)
                if (data.message === `value too long for type character varying(255)`) {
                    //console.log(data.message)
                    setErrors({description: data.message})
                }
                return;
            }
        });

        //console.log(`updated spot`, res)

        if (res?.id) {
            navigate(`/spots/${res.id}`)
        }
    };

    if(!selectedSpot) {
        return <p>Loading....</p>
    }

    return (
        <div className='newspot-form-container'>
            <h1 className='title'>Update Your Spot</h1>

            <form className='newspot-form' onSubmit={handleSubmit} >
                <div className='newspot-form-section-container'>
                    <h3>Where&apos;s your place located?</h3>
                    <p className='newspot-form-caption'>Guests will only get your exact address once they booked a reservation.</p>
                    <div>
                        <p>Country</p>
                        <input
                            className='input-country'
                            type='text'
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            placeholder='Country'
                            name='Country'
                        />
                        {errors?.country && (<div className='newspot-form-required-input'>{errors?.country}</div>)}
                    </div>

                    <div>
                        <p>Street Address</p>

                        <input
                        className='input-address'
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder='Street Address'
                        name='Street Address'
                        />
                        {errors?.address && (<div className='newspot-form-required-input'>{errors?.address}</div>)}
                    </div>

                    <div className='newspot-form-city-state-container'>
                        <div>
                            <span > City </span>

                            <input
                            className='input-city'
                            type='text'
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            placeholder='City'
                            name='City'
                            />
                             {errors?.city && (<div className='newspot-form-required-input'>{errors?.city}</div>)}
                        </div>
                        <div>
                            <span className='input-state-span'> State </span>

                            <input
                            className='input-state'
                            type='text'
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            placeholder='state'
                            name='state'
                            />
                            {errors?.state && (<div className='newspot-form-required-input'>{errors?.state}</div>)}
                        </div>
                    </div>
                    <div className='newspot-form-city-state-container'>
                        <div>
                            <span>Latitude </span>
                            <input
                                className='input-lat'
                                type='text'
                                onChange={(e) => setLatitude(e.target.value)}
                                value={latitude}
                                placeholder='Latitude'
                                name='Latitude'
                            />
                            {errors?.lat && (<div className='newspot-form-required-input'>{errors?.lat}</div>)}
                        </div>
                        <div>
                            <span className='input-state-lng'> Longitude </span>

                            <input
                                className='input-lng'
                                type='text'
                                onChange={(e) => setLongitude(e.target.value)}
                                value={longitude}
                                placeholder='Longitude'
                                name='Longitude'
                            />
                            {errors?.lng && (<div className='newspot-form-required-input'>{errors?.lng}</div>)}
                        </div>
                    </div>
                </div>

                <div className='newspot-form-section-container'>
                    <h3>Describe your place to guests</h3>
                    <p className='newspot-form-caption'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name='description'
                        placeholder='Please write at least 30 characters'
                        rows='10'
                    ></textarea>
                    {errors?.description && (<div className='newspot-form-required-input'>{errors?.description}</div>)}
                </div>

                <div className='newspot-form-section-container'>
                    <h3>Create a title for your spot</h3>
                    <p className='newspot-form-caption'>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    <input
                        type='text'
                        onChange={(e) => setSpotName(e.target.value)}
                        value={spotName}
                        placeholder='Name of your spot'
                        name='spotName'
                    />
                    {errors?.name && (<div className='newspot-form-required-input'>{errors?.name}</div>)}
                </div>

                <div className='newspot-form-section-container'>
                    <h3>Set a base price for your spot</h3>
                    <p className='newspot-form-caption'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <div>
                        <span>$ </span>
                        <input
                            type='text'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            placeholder='Price per night (USD)'
                            name='price'
                        />
                        {errors?.price && (<div className='newspot-form-required-input'>{errors?.price}</div>)}
                    </div>
                </div>

                <div className='newspot-form-button-container'>
                    <button className='newspot-form-button' type='submit' onSubmit={handleSubmit}>Update Your Spot</button>
                </div>

            </form>

        </div>
    )
}


export default UpdateSpot
