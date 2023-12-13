import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './PostReviewModal.css'
import { addReviewThunk } from '../../store/review';
function PostNewReviewModal ({spotId}) {

    const dispatch = useDispatch();
    //const sessionUser = useSelector((state) => state.session.user);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    //console.log(spotId)
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const reviewForm = {
            review,
            stars: rating
        }
        return dispatch(addReviewThunk(reviewForm, spotId))
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            console.log(data)
            if (data && data.message) {
                setErrors(data.errors);
                console.log(`errors`, errors)
            }
            console.log(errors)
            return;
        });
    };


    return (
        <div className='postreview-form-container'>
            <h1>How was your Stay?</h1>
                {errors.message && (
                <p className=''>{errors.message}</p>
            )}
            {errors.review && (<div className='newspot-form-required-input'>{errors.review}</div>)}
            <form className='form' onSubmit={handleSubmit}>
                <textarea className='postreview-form-input'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    name='review'
                    placeholder='Leave your review here...'
                    rows='5'
                >
                </textarea>

                {/* <rating>
                    onChange={(e) => setRating(e.target.value)}

                <rating/> */}
                {errors.stars && (<div className='newspot-form-required-input'>{errors.stars}</div>)}
                <div className='postreview-rating'>
                    <input
                        className='postreview-rating-inputbox'
                        type="number"
                        id="rating"
                        name="rating"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="rating">Stars</label>
                </div>


                <button className='postreview-submit-button'
                    type='button'
                    onClick={handleSubmit}
                    disabled={review.length < 10 || rating === ''}
                >
                    Submit Your Review
                </button>


            </form>
        </div>
    )
}

export default PostNewReviewModal
