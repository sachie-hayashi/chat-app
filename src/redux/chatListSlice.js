import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const chatListSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setChatItem: (state, action) => [...state, action.payload],
    clearChatList: () => initialState,
  },
});

export const { setChatItem, clearChatList } = chatListSlice.actions;

export default chatListSlice.reducer;
