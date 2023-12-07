import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';

//create a rootReducer to allow mutiple reducers to be used by combining them.
const rootReducer = combineReducers({
  session: sessionReducer
});

//create a enhancer to handle additional logger feature.
//if not in production mode, create an enhancer to provide logger in console
//by passing in thunk and logger in the applyMiddleware
//if in production mode, passing in the thunk without the logger in the middleware
let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

//configure the store by passing in rootReducer, preloadedState (default) and enhance to allow use of thunk and logger
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
