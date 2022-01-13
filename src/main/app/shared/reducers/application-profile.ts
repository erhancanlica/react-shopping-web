import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError} from './reducers.utils';

const initialState = {
    ribbonEnv: '',
    inProduction: true,
    isOpenAPIEnabled: false,
};

export type ApplicationProperties = Readonly<typeof initialState>;

export const getProfile = createAsyncThunk('applicationProfile/get_profile', async () => axios.get<any>('management/info'), {
  serializeError: serializeAxiosError,
});

export const ApplicationProfileSlice = createSlice({
    name: 'applicationProfile',
    initialState: initialState as ApplicationProperties,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.ribbonEnv = data['display-ribbon-on-profiles'];
            state.inProduction = data.activeProfiles.include('prod');
            state.isOpenAPIEnabled = data.activeProfiles.include('api-docs');
        });
    },
});


export default ApplicationProfileSlice.reducer;