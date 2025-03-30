import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  loginForm!:FormGroup
  errorMessage!:string

  constructor(private _fb:FormBuilder , private _userservice:UserService , private _router:Router){

    this.loginForm = this._fb.group({
      email:['' , [Validators.required , Validators.email]],
      password:['' , Validators.required]
    })
  }

  onLoginSubmit(){

    if(this.loginForm.valid){

      const userdata={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }

      console.log("signIn data", userdata)
      this._userservice.loginUser(userdata).subscribe({
        next:(res:any)=>{
          console.log("login message" , res)
          if(res.success){
            localStorage.setItem('userToken' , res.token)
            this._router.navigate(['/tasks'])
          }
        },

        error:(err)=>{
          this.errorMessage = err.error.message
          console.error("error is ",this.errorMessage)
        },

        complete:()=>{
          console.log("login user observable completed")
        }
      })
    }
  }
}
