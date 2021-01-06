import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducer/rootReducer';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {

    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}