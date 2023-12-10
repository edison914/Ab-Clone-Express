import { useState} from 'react'
//import { useDispatch} from 'react-redux'
import './NewSpot.css'

function NewSpot () {

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');
    const [description, setDescription] = useState('');
    const [spotName, setSpotName] = useState('');
    const [price, setPrice] = useState();
    const [url1, setUrl1] = useState();
    const [url2, setUrl2] = useState();
    const [url3, setUrl3] = useState();
    const [url4, setUrl4] = useState();
    const [url5, setUrl5] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

    //createa new obj when form is submmitted
    //const newForm = {
    //       id: nanoid(),
    //       title,
    //       body,
    //       imageUrl
    //     }

    //     dispatch(addArticle(newArticle))

    //     reset();
    //   };

    //   const reset = () => {
    //     setTitle('');
    //     setImageUrl('');
    //     setBody('');
    // };
    }

    return (
        <div>
            <h1>Create a New Spot</h1>

            <form onSubmit={handleSubmit} >
                <div className='newspot-form-section-container'>
                    <h3>Where&apos;s your place located?</h3>
                    <p className='newspot-form-caption'>Guests will only get your exact address once they booked a reservation.</p>
                    <div>
                        <p>Country</p>
                        <input
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        placeholder='Country'
                        name='Country'
                        />
                    </div>

                    <div>
                        <p>Street Address</p>
                        <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder='Street Address'
                        name='Street Address'
                        />
                    </div>

                    <div>
                        <span>City </span>
                        <input
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        placeholder='City'
                        name='City'
                        />
                        <span> State </span>
                        <input
                        type='text'
                        onChange={(e) => setStates(e.target.value)}
                        value={states}
                        placeholder='state'
                        name='state'
                        />
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

                <div>
                    <button className='newspot-form-button' type='submit'>Create Spot</button>
                </div>

            </form>

        </div>
    )
}


export default NewSpot
