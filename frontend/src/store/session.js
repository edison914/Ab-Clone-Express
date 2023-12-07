import { csrfFetch } from "./csrf";

//const for action types so actions dont duplicate
const SET_USER = `session/SET_USER`;
const REMOVE_USER = `session/REMOVE_USER`;

//action creators for handling both actions
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    }
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
};

//thunk action to make POST request, if success, then dipatch with adduser action
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch (`/api/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({credential, password})
    });

    if (res.ok) {
        const data = await res.json()
        //console.log(data)
        dispatch(setUser(data.user))
        return data;
      } else {
        const err = await res.json();
        return err;
    }
}

//thunk action to make get request for current session user
export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch (`/api/session`);
    //console.log(res)
    if (res.ok) {
        const data = await res.json()
        dispatch(setUser(data.user))
        return data;
      } else {
        const err = await res.json();
        return err;
    }
}


//initial state set to null at begining
const initialState = {
    user: null
}

const sessionReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case SET_USER: {
            newState.user = action.payload
            return newState
        }
        case REMOVE_USER: {
            newState.user = null
            return newState
        }
        default:
            return state;
    }
}

export default sessionReducer;
