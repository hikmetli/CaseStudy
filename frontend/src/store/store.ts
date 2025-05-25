import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import { sampleApi } from '../app/apis/sample/sampleApi';
import { userApi } from '../app/apis/user/userApi';
import { uiSlice } from '../app/slices/uiSlice';
import { errorApi } from '@/app/apis/error/errorApi';
import { accountApi } from '@/app/apis/account/accountApi';
import { transactionApi } from '@/app/apis/transaction/transactionApi';
import { categoryApi } from '@/app/apis/category/categoryApi';
import { transferApi } from '@/app/apis/transfer/transferApi';

export const store = configureStore({
    reducer: {
        [sampleApi.reducerPath]: sampleApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [transferApi.reducerPath]: transferApi.reducer,

        [errorApi.reducerPath]: errorApi.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(
            sampleApi.middleware,
            userApi.middleware,
            accountApi.middleware,
            transactionApi.middleware,
            categoryApi.middleware,
            transferApi.middleware,

            errorApi.middleware,
        )
    )
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();