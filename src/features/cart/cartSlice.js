import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
  };

// export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
//   try {
//         const resp = await fetch(url);
//         return await resp.json();
//     } catch (err) {
//         return console.log(err);
//     }
// });
export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (name, thunkAPI) => {
      try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await axios(url);
  
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );

  
const cartSlice = createSlice({
    name: 'cart',
    initialState, // initial state of the cart slice
    reducers: {
        clearCart: (state) => {
            state.cartItems = []; // clear all items in the cart
        },
        removeItem: (state, action) => {
            const itemId = action.payload; // get the id of the item to be removed
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId); // filter out the item with the matching id
        },
        increment: (state, action) => {
            const itemId = action.payload; // get the id of the item to be incremented
            const cartItem = state.cartItems.find((item) => item.id === itemId); // find the cart item with the matching id
            cartItem.amount = cartItem.amount + 1; // increment the amount of the item by 1
        },
        decrement: (state, action) => {
            const itemId = action.payload; // get the id of the item to be decremented
            const cartItem = state.cartItems.find((item) => item.id === itemId); // find the cart item with the matching id
            cartItem.amount = cartItem.amount - 1; // decrement the amount of the item by 1
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount; // sum up the amount of each item
                total += item.amount * item.price; // calculate the total price
            });
            state.amount = amount; // update the total number of items in the cart
            state.total = total; // update the total cost of the cart
        },
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
          state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
          console.log('ation', action);
          state.isLoading = false;
          state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state) => {
          state.isLoading = false;
        },
    },
});

// console.log(typeof cartSlice.name); // Outputs: 'string'
// console.log(cartSlice.name); // Outputs: 'cart'

// console.log(cartSlice.actions); // Outputs the generated action creators, intially it is {} ,and if we have any action genertors then it will display those action generators { ex : addItem, removeItem, clearCart }
// console.log(initialState) // {cartItems: Array(0), amount: 0, total: 0, isLoading: true}

export const { clearCart, removeItem, increment, decrement, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;