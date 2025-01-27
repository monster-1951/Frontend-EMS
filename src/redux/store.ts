import {configureStore} from '@reduxjs/toolkit'
import roleSlice  from './role/roleSlice'
import idSlice from './id/idSlice'
export default configureStore({
    reducer:{
        role:roleSlice,
        id:idSlice
    }
})