import { createAction, props } from "@ngrx/store";


export const loaduserProfile = createAction(
    '[user] load user profile'
)


export const loaduserProfileSuccess = createAction(
    '[user] load user profile success',
    props<{name: string , profilepic: string}>()
)


export const loaduserProfileFailure = createAction(
    '[user] load user profile failure',
    props<{error: string}>()
)


export const updateName = createAction(
    '[user] update Name',
    props<{name:string}>()
)

export const updateNameSuccess = createAction(
    '[user] update name success',
    props<{name:string}>()
)

export const updateNameFailure = createAction(
    '[user] update name failure',
    props<{error : string}>()
)

export const updateProfilePicture = createAction(
    '[user] update profile picture',
    props<{ s3FileUrl: string }>()  
)

export const updateProfilePictureSuccess = createAction(
    '[user] update profile picture success',
    props<{ imagePath: any }>() 

)

export const updateProfilePictureFailure = createAction(
    '[user] update profile picture failure',
    props<{ error: any }>()
);