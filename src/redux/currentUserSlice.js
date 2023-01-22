import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  uid: '',
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
          ? { isLoggedIn: true, uid: user.uid, email: user.email }
          : initialState;

        return { payload: currentUser };
      },
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
