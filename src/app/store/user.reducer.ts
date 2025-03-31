import { createReducer, on } from "@ngrx/store";
import { loaduserProfile, loaduserProfileFailure, loaduserProfileSuccess, updateName, updateNameFailure, updateNameSuccess, updateProfilePicture, updateProfilePictureFailure, updateProfilePictureSuccess } from "./user.action";



export interface ProfileState {

    name: string,
    profilepic: string | null
    loading: boolean;
    error: string | null;
}

export const initialState: ProfileState = {
    name: '',
    profilepic: '',
    loading:false,
    error:null
}


export const userReducer = createReducer(

    initialState,
    on(loaduserProfile, (state) => ({
        ...state,
        loading:true
    })),

    on(loaduserProfileSuccess , (state , {name , profilepic})=>({
        ...state,
        name,
        profilepic,
        loading:false,
        error:null
    })),

    on(loaduserProfileFailure , (state , {error})=>({
        ...state,
        loading:false,
        error
    })),

    on(updateName , (state)=>({
        ...state,
        loading:true
    })),

    on(updateNameSuccess , (state , {name})=>({
        ...state,
        name,
        loading:false,
        error:null
    })),

    on(updateNameFailure , (state , {error})=>({
        ...state,
        loading:false,
        error
    })),

    on(updateProfilePicture, (state) => ({
        ...state,
        loading:true,
        error:null
    })),

    on(updateProfilePictureSuccess, (state, { imagePath }) => {
        console.log("New profile pic path:", imagePath.profileImage); 
        return {
            ...state,
            profilepic: imagePath.profileImage,
            loading: false,
            error: null
        };
    }),
    

    on(updateProfilePictureFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
      }))
)