import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:'',
};

// Register User

export const register = createAsyncThunk(
    'auth/register',
    async (data,  thunkAPI ) => {
        try {
            return await authService.register(data);
        } catch (error) {
            const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login User



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset : (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
        // login: (state, action) => {
        //     state.user = action.payload;
        //     state.isError = false;
        //     state.isSuccess = true;
        //     state.isLoading = false;
        //     state.message = 'Login Success';
        // }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.pending, (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = true;
            state.message = 'Loading...';
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = 'Register Success';
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload;
        });

    }
});


export const { reset } = authSlice.actions;
export default  authSlice.reducer;