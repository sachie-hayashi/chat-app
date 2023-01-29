import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, ...data } = action.payload;

      // Check if user exists in state (array)
      const index = state.findIndex(user => user.uid === uid);

      // If user does not exist, add user to state (array)
      if (index === -1) return [...state, action.payload];

      // If user exists, update the user with new data (Immer built in Redux Toolkit makes it possible to mutate state)
      state[index] = { ...state[index], ...data };
    },
    removeUser: (state, action) =>
      state.filter(user => user.uid !== action.payload),
  },
});

export const { setUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
