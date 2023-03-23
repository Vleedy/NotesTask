import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHashtags } from '../../utils/getHashtags';
type noteItem = { name: string; description: string; date: number; hashtags: Array<string> };

export interface noteState {
  notes: noteItem[];
}

const initialState: noteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: 'Note',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<noteItem>) {
      state.notes.push(action.payload);
    },

    deleteNote(state, action: PayloadAction<number>) {
      state.notes = state.notes.filter((item) => item.date !== action.payload);
    },

    editNote(state, action: PayloadAction<{ date: number; text: string }>) {
      const index = state.notes.findIndex((item) => item.date === action.payload.date);
      const hashtags = getHashtags(action.payload.text).map((item) => `#${item.hashtag}`);
      state.notes[index].description = action.payload.text;
      state.notes[index].hashtags = Array.from(new Set(hashtags));
    },
    deleteHashtag(state, action: PayloadAction<{ date: number; tag: string }>) {
      const index = state.notes.findIndex((item) => item.date === action.payload.date);
      state.notes[index].hashtags = state.notes[index].hashtags.filter(
        (item) => item !== action.payload.tag
      );
    },
    addHashtag(state, action: PayloadAction<{ date: number; tag: string }>) {
      const index = state.notes.findIndex((item) => item.date === action.payload.date);
      state.notes[index].hashtags.push(action.payload.tag);
    },
  },
});

export default noteSlice.reducer;
export const { addNote, deleteNote, editNote, deleteHashtag, addHashtag } = noteSlice.actions;
