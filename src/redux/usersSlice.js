import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: {
      reducer: (state, action) => [...state, action.payload],
      prepare: user => {
        // remove non-serializable value error for Firestore timestamp
        const { nanoseconds, seconds } = user.createdAt;

        return {
          payload: { ...user, createdAt: { nanoseconds, seconds } },
        };
      },
    },
    clearUsers: () => initialState,
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
