import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectImage, selectName } from '../../store/user.selector';
import { loaduserProfile } from '../../store/user.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showProfileMenu = false;
  name$: Observable<string>;
  profilepic$: Observable<string | null>;

  constructor(private _router: Router, private _userservice: UserService, private _store: Store) {

    this.name$ = this._store.select(selectName)
    this.profilepic$ = this._store.select(selectImage)
    this._store.dispatch(loaduserProfile())

  }


  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure want to Logout?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, stay logged in'
    }).then((result) => {

      if (result.isConfirmed) {
        localStorage.removeItem('userToken')
        this._router.navigate(['/login']);
        Swal.fire(
          'Logged Out!',
          'You have successfully logged out.',
          'success'
        )
      }
    })
  }
  
}
