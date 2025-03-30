import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
