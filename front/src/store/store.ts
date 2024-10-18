import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Api, TheCatApi} from "./api.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import {ICatsSlice, ILayoutCatImage} from "./types.ts";
import {catsDto, favoriteCatsDto} from "./dto.ts";
import {useDispatch, useSelector} from "react-redux";


const initialState: ICatsSlice = {cats: [], likes: {}}

export const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        addCats: (state, action: PayloadAction<catsDto[]>) => {
            const transformed: ILayoutCatImage[] = action.payload.map((img) => ({id:img.id,url:img.url,isLiked:(img.id in state.likes)}));
            state.cats = [...state.cats,...transformed];
        },
        clearCats: (state) => {
            state.cats = [];
        },
        updateLikes: (state, action: PayloadAction<favoriteCatsDto[]>) => {
            const likesDictionary: {[key:string]:ILayoutCatImage} = {};
            action.payload.forEach(like => likesDictionary[like.catId]={id:like.catId,isLiked:true,url:like.url})
            state.cats.forEach(cat => cat.isLiked=cat.id in likesDictionary)
            state.likes = likesDictionary;
        },
    },
})


export const store = configureStore({
    reducer: {
        [Api.reducerPath]: Api.reducer,
        [TheCatApi.reducerPath]: TheCatApi.reducer,
        cats:catsSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(Api.middleware).concat(TheCatApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const {addCats,clearCats,updateLikes} = catsSlice.actions;