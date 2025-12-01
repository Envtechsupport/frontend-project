import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";

const createStore = configureStore({ reducer: rootReducer() });

export default createStore;
