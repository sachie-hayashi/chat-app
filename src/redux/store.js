import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';
import chatListReducer from './chatListSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    chatList: chatListReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Remove non-serializable value error for Firestore timestamp
      serializableCheck: false,
    }),
});
