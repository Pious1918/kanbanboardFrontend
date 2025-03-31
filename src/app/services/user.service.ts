import { Injectable } from '@angular/core';
import { IUser, IUserLogin } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private _api = "https://kanboardbackend.onrender.com"
  constructor(private _http:HttpClient) { }



  //User related API calls
  registeruser(userdata:IUser){

    return this._http.post(`${this._api}/register`,userdata)

  }

  loginUser(userdata:IUserLogin){
    return this._http.post(`${this._api}/login` , userdata)
  }

  getuserprofile(){
    return this._http.get(`${this._api}/userprofile`)
  }

  updatename(name:string){
    return this._http.patch(`${this._api}/update-name`, {name})
  }

  updateProfilePicture(s3url:string){
    return this._http.patch(`${this._api}/update-image`, {s3url})
  }


  //task related API Calls
  getalltask(){
    return this._http.get(`${this._api}/tasks`)
  }


  addtask(taskdata:any){
    return this._http.post(`${this._api}/addtask` , {taskdata})
  }

  updatetaskstatus(taskdata:any){
    return this._http.patch(`${this._api}/updatestatus/${taskdata._id}`,{ status: taskdata.status })
  }

  deletetask(taskId:string){
    return this._http.delete(`${this._api}/deletetask/${taskId}`)
  }

  updateTaskdata(task: any) {
    console.log("@service",task)
    return this._http.put(`${this._api}/updatedata/${task._id}`, task);
  }


  
}
