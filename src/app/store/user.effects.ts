import { Action } from "@ngrx/store";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { HttpClient } from "@angular/common/http";
import { loaduserProfile, loaduserProfileFailure, loaduserProfileSuccess, updateName, updateNameFailure, updateNameSuccess, updateProfilePicture, updateProfilePictureFailure, updateProfilePictureSuccess } from "./user.action";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";

@Injectable()
export class UserEffects {

    constructor(private action$: Actions, private _userservice: UserService, private _http: HttpClient) { }




    loadUserProfile$ = createEffect(() =>
        this.action$.pipe(
            ofType(loaduserProfile),
            mergeMap(() => this._userservice.getuserprofile().pipe(
                map((user: any) => {
                    console.log("User fetched in effect:", user);

                    const userData = user.userdata || user; 

                    return loaduserProfileSuccess({
                        name: userData.name,
                        profilepic: userData.profileImage 
                    });
                }),
                catchError(error => {
                    console.error("Error fetching user profile:", error);
                    return of(loaduserProfileFailure({ error: error.message || 'Unknown error' }));
                })
            ))
        )
    );



    updateName$ = createEffect(() =>

        this.action$.pipe(
            ofType(updateName),
            mergeMap((action) =>
                this._userservice.updatename(action.name).pipe(
                    map(() => updateNameSuccess({ name: action.name })),
                    catchError((error) =>
                        of(updateNameFailure({ error }))
                    )
                )
            )
        )
    )

    updateProfilePicture$ = createEffect(() =>

        this.action$.pipe(
            ofType(updateProfilePicture),
            switchMap(({ s3FileUrl }) =>
                this._userservice.updateProfilePicture(s3FileUrl).pipe(
                    map((res: any) => updateProfilePictureSuccess({ imagePath: res.profilepic })),
                    catchError((error) => of(updateProfilePictureFailure({ error })))
                )
            )
        )
    )


}