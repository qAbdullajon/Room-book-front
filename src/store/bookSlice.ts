import { createSlice } from "@reduxjs/toolkit";

interface BookState {
  books: {
    date: Date;
    name: string;
    roomId: {
      name: string;
      price: string;
      capacity: string;
      _id: string;
    };
    _id: string;
  }[];
  isOpen: boolean;
  roomId: string | null;
}

const initialState: BookState = {
  books: [],
  isOpen: false,
  roomId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setBooks: (store, action) => {
      store.books = action.payload;
    },
    setOpenBook: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.roomId = action.payload.roomId;
    },
  },
});

export const { setBooks, setOpenBook } = authSlice.actions;

export default authSlice.reducer;
