import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore, PersistConfig} from 'redux-persist';
import logger from 'redux-logger';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import accountReducer from './accountSlice';

const rootReducer = combineReducers({
  account: accountReducer,
});

const configuration: PersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: [],
};

// Creating a new persisted reducer with the configuration and root reducer
const persistedReducer = persistReducer(configuration, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
