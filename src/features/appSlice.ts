import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  selectedOption: string;
  discountCode: string;
  notes: string;
}

const initialState: AppState = {
  selectedOption: 'Option A',
  discountCode: '',
  notes: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    //Common function to store data in app state for all 3 fields
    setFormData: (state, action: PayloadAction<{name: string, value: string}>) => {
      state = {...state, [action.payload.name]: action.payload.value};
    }
  },
});

export const { setFormData } = appSlice.actions;

export default appSlice.reducer;
