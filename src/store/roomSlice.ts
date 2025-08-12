import { createSlice } from "@reduxjs/toolkit";

interface RoomState {
  rooms: {
    capacity: string;
    name: string;
    price: string;
    _id: string;
  }[];
  isOpen: boolean;
  valRoom: {
    capacity: string;
    name: string;
    price: string;
    _id: string;
  } | null;
}

const initialState: RoomState = {
  rooms: [],
  isOpen: false,
  valRoom: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRooms: (store, action) => {
      store.rooms = action.payload;
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setValRoom: (state, action) => {
      state.valRoom = action.payload;
    },
  },
});

export const { setRooms, setOpen, setValRoom } = authSlice.actions;

export default authSlice.reducer;
