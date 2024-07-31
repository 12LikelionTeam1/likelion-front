import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LikedStateType = {
  liked: string[];
};

const INIT = {
  liked: [],
} as LikedStateType;

const liked = createSlice({
  name: 'liked',
  initialState: INIT,
  reducers: {
    updateLiked: (_, action: PayloadAction<LikedStateType>) => {
      return action.payload;
    },
    addLiked: (prev, action: PayloadAction<string>) => {
      return {
        liked: [...prev.liked, action.payload],
      };
    },
    deleteLiked: (prev, action: PayloadAction<string>) => {
      const res = [...prev.liked];

      res.splice(res.findIndex((v) => v == action.payload));

      return {
        liked: res,
      };
    },
  },
});

export const { updateLiked, addLiked, deleteLiked } = liked.actions;
export default liked.reducer;
