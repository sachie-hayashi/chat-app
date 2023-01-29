import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    setChatItem: (state, action) => [...state, action.payload],
    clearChatList: () => initialState,
  },
});

export const { setChatItem, setChatToo, clearChatList } = chatListSlice.actions;

export default chatListSlice.reducer;
