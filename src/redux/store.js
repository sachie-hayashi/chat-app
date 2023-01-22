import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: usersReducer,
  },
});
