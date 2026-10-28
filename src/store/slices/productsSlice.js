import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"; // we imported the createSlice and createAsyncThunk from the redux library

export const fetchProducts = createAsyncThunk ( //variable created for createAsyncThunk function and inside that function we have products and we want to fetch the products
    "products/fetchProducts",
    async ()=>{ // because we're requesting products from the server so we will use async and await 
        const response = await fetch ("https://fakestoreapi.com/products");
// the asynchronous function fetches the products and the await wait for the response 
        if (!response.ok){ // if the response was not successful
            throw new Error ("Failed to fetch products") // stop the app and run this error
        }
        return response.json() // return response ( products ) as json
    
    }
);

const productsSlice = createSlice ({ // createSlice function from redux toolkit that create for us the reducer and the actions
    name: "products", // product name
    initialState:{products: [], loading: false, error: null}, // products hya dlw2ty 3obara 3n empt array, el data/product bt-load dlw2ty wla la, el error message lw hasal moshkla
    reducers: {}, // htkoun fadia 3shan m3ndnash asynchronous action mehtgenha hena
    extraReducers: (builder) =>{ 
        builder // btt3amel m3 actions gaya mn bara el slice and mostly this is with createAsyncThunk ele btt3aml m3 el fetch

        .addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }) // request is on, data is loading, no error yet

        .addCase (fetchProducts.fulfilled, (state, action) =>{
            state.loading = false;
            state.products = action.payload
        } ) // request was successful, no loading, and no error message

        .addCase (fetchProducts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        }) // request was rejected , no loading and display the error message
    }
})

export default productsSlice.reducer;