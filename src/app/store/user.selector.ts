import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./user.reducer";


export const selectprofileState = createFeatureSelector<ProfileState>('userprofile')

export const selectName = createSelector(
    selectprofileState,
    (state)=>state.name
)

export const selectImage = createSelector(
    selectprofileState,
    (state)=>state.profilepic
)