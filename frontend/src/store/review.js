import { csrfFetch } from "./csrf";
import { getSpotDetailThunk } from "./spot";

//const for action types so actions dont duplicate
const LOAD_REVIEWS_BYSPOT = `review/LOAD_REVIEWS_BYSPOT`
const REMOVE_REVIEW = `review/REMOVE_REVIEW`;
//const ADD_REVIEW_BYSPOT = `review/ADD_REVIEW_BYSPOT`

//action creators for handling both actions

const loadReviewsBySpot = (reviews) => {
    return {
        type: LOAD_REVIEWS_BYSPOT,
        payload: reviews
    }
}

const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        payload: reviewId
    }
};


//thunk action to fetch all reviews
export const getReviewsByIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    //console.log(`is this even called?`, res)
    if (res.ok) {
        const reviews = await res.json()
        //console.log(`res1 return`, reviews)
        dispatch(loadReviewsBySpot(reviews.Reviews))
        return reviews;
      } else {
        const err = await res.json();
        return err;
    }
}

//thunk action to add review to a spot
export const addReviewThunk = (reviewForm, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewForm)
    });
    //console.log(`is this even called?`, res)
    if (res.ok) {
        //const reviews = await res.json()
        //console.log(`response from adding review`, reviews)
        //IMPORTANT, since the returned reveiws are not the same as whats in the state in term of format,
        //dispatch another thunk action to fetch newly updated reviews by the Id instead!
        dispatch(getReviewsByIdThunk(spotId))
        dispatch(getSpotDetailThunk(spotId))
        return res;
      } else {
        //console.log(`is this err called`)
        const err = await res.json();
        return err;
    }
}

//
export const DeleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      })
    //console.log(`is this even called?`, res)
    if (res.ok) {
        const data = await res.json()
        //console.log(data)
        dispatch(removeReview(reviewId))
        return data;
      } else {
        const err = await res.json();
        return err;
    }
}

const initialState = {

}

const reviewReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_REVIEWS_BYSPOT: {
            action.payload.forEach(review => {
                newState[review.id] = { ...newState[review.id], ...review}
            })
            return newState
        }
        case REMOVE_REVIEW: {
            //action.payload is the reviewId
            delete newState[action.payload]
            return newState
        }
        default:
            return state;
    }
}

export default reviewReducer;
