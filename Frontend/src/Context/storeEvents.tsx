import {DispatchState, RootState} from "./Store"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"

export const useAppDispatch : () => DispatchState = useDispatch
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector