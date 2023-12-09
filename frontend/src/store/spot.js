import { csrfFetch } from "./csrf";

//const for action types so actions dont duplicate
// const EDIT_SPOT = `spot/EDIT_SPOT`;
// const REMOVE_SPOT = `spot/REMOVE_SPOT`;
const LOAD_SPOTS = `spot/LOAD_SPOTS`
const LOAD_SPOT_DETAIL = `spot/LOAD_SPOT_DETAIL`

//action creators for handling both actions
// const editSpot = (spot) => {
//     return {
//         type: EDIT_SPOT,
//         payload: spot,
//     }
// };

// const removeSpot = () => {
//     return {
//         type: REMOVE_SPOT
//     }
// };

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
    }
}

const loadSpotDetail = (spotDetail) => {
    return {
        type: LOAD_SPOT_DETAIL,
        payload: spotDetail
    }
}

//thunk action to fetch all spots
export const getSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`);
    //console.log(`is this even called?`, res)
    if (res.ok) {
        const data = await res.json()
        //console.log(data.Spots)
        dispatch(loadSpots(data.Spots))
        return data;
      } else {
        const err = await res.json();
        return err;
    }
}

export const getSpotDetailThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    //console.log(`is this even called?`, res)
    if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch(loadSpotDetail(data))
        return data;
      } else {
        const err = await res.json();
        return err;
    }
}


const initialState = {

}

const spotReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_SPOTS: {
            action.payload.forEach(spot => {
                newState[spot.id] = { ...newState[spot.id], ...spot};
            });
            //console.log(`newState spots`, newState)
            return newState
        }
        case LOAD_SPOT_DETAIL: {
            //newState.spotDetail = action.payload
            //find the old current spot data by the id
            //make a copy of current old spot data
            //updating the old spot data with new fetched data
            newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
            //console.log(`newState spots`, newState)
            return newState
        }
        // case EDIT_SPOT: {
        //     newState.user = null
        //     return newState
        // }
        default:
            return state;
    }
}

export default spotReducer;