import { csrfFetch } from "./csrf";

//const for action types so actions dont duplicate
const LOAD_REVIEWS_BYSPOT = `LOAD_REVIEWS_BYSPOT`

//action creators for handling both actions

const loadReviewsBySpot = (reviews) => {
    return {
        type: LOAD_REVIEWS_BYSPOT,
        payload: reviews
    }
}

//thunk action to fetch all spots
export const getReviewsByIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    //console.log(`is this even called?`, res)
    if (res.ok) {
        const reviews = await res.json()
        //console.log(reviews)
        dispatch(loadReviewsBySpot(reviews.Reviews))
        return reviews;
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
        default:
            return state;
    }
}

export default reviewReducer;
