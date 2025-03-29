import { TProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
    products: TProduct[];


}

const initialState: CartState = {
    products: [],


};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productToAdd = state.products.find((product) => product._id === action.payload._id);
            if (productToAdd) {
                productToAdd.quantity += 1;
                return;
            }
            state.products.push({ ...action.payload, quantity: 1 })
        },
        incrementOrderQuantity: (state, action) => {
            const increment = state.products.find((product) => product._id === action.payload);

            if (increment) {
                increment.quantity += 1;
                return;
            }
        },
        decrementOrderQuantity: (state, action) => {
            const decrement = state.products.find((product) => product._id === action.payload);
            if (decrement && decrement.quantity > 1) {
                decrement.quantity -= 1;
                return;
            }
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload);
        },

        clearCart: (state) => {
            state.products = [];
        },

    }
})

export const { addToCart, removeFromCart, clearCart, incrementOrderQuantity, decrementOrderQuantity } = cartSlice.actions;

export default cartSlice.reducer;