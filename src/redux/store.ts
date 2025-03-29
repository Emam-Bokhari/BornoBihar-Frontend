import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from "@/redux/features/wishlist/wishlistSlice";
import cartReducer from "@/redux/features/cart/cartSlice"
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { storageLocal } from './storage';


// persist configuration for wishlist
const persistConfigWishlist = {
    key: "wishlist",
    storage: storageLocal,
};

// persist configuration for cart
const persistConfigCart = {
    key: "cart",
    storage: storageLocal,
};

// persist reducer for wishlist
const persistedWishlistReducer = persistReducer(persistConfigWishlist, wishlistReducer);

const persistedCartReducer = persistReducer(persistConfigCart, cartReducer);

export const makeStore = () => {
    return configureStore({
        reducer: {
            wishlist: persistedWishlistReducer,
            cart: persistedCartReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']