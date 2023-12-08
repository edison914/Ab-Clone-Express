import { csrfFetch } from "./csrf";

//const for action types so actions dont duplicate
const EDIT_SPOT = `spot/EDIT_SPOT`;
const REMOVE_SPOT = `spot/REMOVE_SPOT`;
const LOAD_SPOTS = `spot/LOAD_SPOTS`

//action creators for handling both actions
const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot,
    }
};

const removeSpot = () => {
    return {
        type: REMOVE_SPOT
    }
};

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
    }
}

//thunk action to fetch all spots
export const getSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`);
    //console.log(`is this even called?`, res)
    if (res.ok) {
        const data = await res.json()
        console.log(data.Spots)
        dispatch(loadSpots(data.Spots))
        return data;
      } else {
        const err = await res.json();
        return err;
    }
}


//thunk action to make POST request, if success, then dipatch with adduser action
// export const login = (user) => async (dispatch) => {
//     const { credential, password } = user;
//     const res = await csrfFetch (`/api/session`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({credential, password})
//     });

//     if (res.ok) {
//         const data = await res.json()
//         //console.log(data)
//         dispatch(setUser(data.user))
//         return data;
//       } else {
//         const err = await res.json();
//         return err;
//     }
// }


//thunk action to remove a logined user
// export const logout = () => async(dispatch) => {
//     const res = await csrfFetch('/api/session', {
//         method: 'DELETE'
//     });
//     //console.log(res)
//     if (res.ok) {
//     const data = await res.json()
//     dispatch(removeUser());
//     return data;
//     } else {
//     const err = await res.json();
//     return err;
// }
// }
//initial state set to null at begining
const initialState = {
}

const spotReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_SPOTS: {
            newState.spots = action.payload
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
