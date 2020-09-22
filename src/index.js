import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore,compose} from "redux";
import reducer from "./reducer"
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import 'bootstrap/dist/css/bootstrap.min.css';

import Search from "./component/Search/Search";
import Checkout from "./component/Checkout/checkout";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(reduxThunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Search} />
                    <Route exact path="/checkout" component={Checkout} />
                </Switch>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);