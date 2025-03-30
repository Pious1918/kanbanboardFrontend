import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule , RouterModule ,CommonModule , ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  registerForm!:FormGroup
  errorMessage: string = '';
  showPassword!:any

  constructor(private _fb:FormBuilder , private _userservice:UserService , private _router:Router){

    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)
      ]],
    })
  }


  onRegisterSubmit() {

    if(this.registerForm.valid){
      const registerdata:IUser = {
        name:this.registerForm.value.name,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password
      }

      console.log("register data ", registerdata)

      this._userservice.registeruser(registerdata).subscribe({

        next:(res)=>{
          console.log("registration success", res)
          this.showtoast()
          this._router.navigate(['/login'])
        },

        error:(err:any)=>{
          this.errorMessage = err.error.message
          console.log("mesage",this.errorMessage)
          console.error("registration failed",err)
        },

        complete:()=>{
          console.log("registration observable completed")
        }

      })
    }

  }

  showtoast(){
    Swal.fire({
      title:'Account Created Successfully',
      icon:'success',
      toast:true,
      position:'top-end',
      showConfirmButton:false,
      timer:3000
    })
  }


}
