import { useState} from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { addNewSpotThunk, addImgToSpotThunk } from '../../store/spot'
import './NewSpot.css'

function NewSpot () {

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [spotName, setSpotName] = useState('');
    const [price, setPrice] = useState();
    const [url1, setUrl1] = useState();
    const [url2, setUrl2] = useState();
    const [url3, setUrl3] = useState();
    const [url4, setUrl4] = useState();
    const [url5, setUrl5] = useState();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        console.log(spotData)

        const newSpotImage1 = {
            url: url1,
            preview: true
        }

        let res = await dispatch(addNewSpotThunk(spotData));
        //let res2 = await dispatch(addNewImageThunk(newSpotImage1));
        console.log(`new added Spot`, res)

        if (res.id) {
            const spotId = res.id
            let res2 = await dispatch(addImgToSpotThunk(newSpotImage1, spotId))

            console.log(`new added image`, res2)

            navigate(`/spots/${res.id}`)
        }

    //    dispatch(addNewSpotImageThunk(newSpotImage1))

        setCountry('');
        setAddress('');
        setCity('');
        setState('');
        setLatitude('');
        setLongitude('');
        setSpotName('');
        setPrice('');
        setUrl1('');
        setUrl2('');
        setUrl3('');
        setUrl4('');
        setUrl5('');
    };


    return (
        <div className='newspot-form-container'>
            <h1 className='title'>Create a New Spot</h1>

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
                        {!country && (<div className='newspot-form-required-input'>Country is required</div>)}
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
                        {!address && (<div className='newspot-form-required-input'>Address is required</div>)}
                    </div>

                    <div className='newspot-form-city-state-container'>
                        <div>
                            <span> City </span>

                            <input
                            className='input-city'
                            type='text'
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            placeholder='City'
                            name='City'
                            />
                            {!city && (<div className='newspot-form-required-input'>City is required</div>)}
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
                            {!state && (<div className='newspot-form-required-input'>State is required</div>)}
                        </div>
                    </div>
                    <div className='newspot-form-city-state-container'>
                        <div>
                            <span> Latitude </span>
                            <input
                            type='text'
                            className='input-lat'
                            onChange={(e) => setLatitude(e.target.value)}
                            value={latitude}
                            placeholder='Latitude'
                            name='Latitude'
                            />
                            {!latitude && (<div className='newspot-form-required-input'>Latitude is required</div>)}
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
                            {!longitude && (<div className='newspot-form-required-input'>Longitude is required</div>)}
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
                    {description.length < 30 && (<div className='newspot-form-required-input'>Description needs a minimum of 30 characters</div>)}
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
                    {!spotName && (<div className='newspot-form-required-input'>Name for the spot is required</div>)}
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
                        {!price && (<div className='newspot-form-required-input'>Price is required</div>)}
                    </div>

                </div>

                <div className='newspot-form-section-container'>
                    <h3>Liven up your spot with photos</h3>
                    <p className='newspot-form-caption'>Submit a link to at least one photo to publish your spot.</p>
                    <input
                        type='text'
                        onChange={(e) => setUrl1(e.target.value)}
                        value={url1}
                        placeholder='Preview Image URL'
                        name='url1'
                    />
                    {!url1 && (<div className='newspot-form-required-input'>The preview image URL is required, and must end with png, jpg, or jpeg </div>)}
                    <input
                        type='text'
                        onChange={(e) => setUrl2(e.target.value)}
                        value={url2}
                        placeholder='Image URL'
                        name='url2'
                    />
                    <input
                        type='text'
                        onChange={(e) => setUrl3(e.target.value)}
                        value={url3}
                        placeholder='Image URL'
                        name='url3'
                    />
                    <input
                        type='text'
                        onChange={(e) => setUrl4(e.target.value)}
                        value={url4}
                        placeholder='Image URL'
                        name='url4'
                    />
                    <input
                        type='text'
                        onChange={(e) => setUrl5(e.target.value)}
                        value={url5}
                        placeholder='Image URL'
                        name='url5'
                    />
                </div>

                <div className='newspot-form-button-container'>
                    <button className='newspot-form-button' type='submit' onSubmit={handleSubmit}>Create Spot</button>
                </div>

            </form>

        </div>
    )
}


export default NewSpot
