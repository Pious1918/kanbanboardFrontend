import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthredirectService {

  constructor(private _authservice: AuthService, private _router: Router) { }

  canActivate(): boolean {
    if (this._authservice.isAuthenticated()) {
      this._router.navigate(['/tasks']);
      return false;
    }
    return true;
  }
}
