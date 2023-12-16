import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import strainService from "./strainService"

const initialState = {
  strains: [],
  loading: false,
	error: null,
}

// Add strain
export const addStrain = createAsyncThunk (
	'strain/add-strain',
	async (strains, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			// state.strains.push({user: thunkAPI.getState().auth.user._id})
      return await strainService.addStrain(strains, token)
    } catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Get ALL strains
export const getAllStrains = createAsyncThunk (
	'strains/get-all-strains',
	async (_, thunkAPI) => {
		try {
			return await strainService.getAllStrains()
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Get strains by USER
export const getStrainByUser = createAsyncThunk (
	'strains/strain-collection',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await strainService.getStrainByUser(token)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const strainSlice = createSlice({
	name: 'strain',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(addStrain.pending, (state) => {
				state.loading = true
			})
			.addCase(addStrain.fulfilled, (state, action) => {
				state.strains.push(action.payload)
				state.loading = false
				state.error = null
			})
			.addCase(addStrain.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(getStrainByUser.pending, (state) => {
				state.loading = true
			})
			.addCase(getStrainByUser.fulfilled, (state, action) => {
				state.strains.push(action.payload)
				state.loading = false
				state.error = null
			})
			.addCase(getStrainByUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}

})

export const { reset } = strainSlice.actions

export default strainSlice.reducer