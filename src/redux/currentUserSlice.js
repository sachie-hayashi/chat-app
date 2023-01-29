import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  uid: '',
  username: '',
  email: '',
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    setCurrentUser: {
      reducer: (state, action) => {
        return { ...state, ...action.payload };
      },
      prepare: user => {
        const currentUser = user
          ? {
              isLoggedIn: true,
              uid: user.uid,
              username: user.username || '',
              email: user.email,
            }
          : initialState;

        return { payload: currentUser };
      },
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
