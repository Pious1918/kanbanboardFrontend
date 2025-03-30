import { Injectable } from '@angular/core';
import { IUser, IUserLogin } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private _api = "http://localhost:3000"
  constructor(private _http:HttpClient) { }

  registeruser(userdata:IUser){

    return this._http.post(`${this._api}/register`,userdata)

  }

  loginUser(userdata:IUserLogin){
    return this._http.post(`${this._api}/login` , userdata)
  }


  getalltask(){
    return this._http.get(`${this._api}/tasks`)
  }


  addtask(taskdata:any){
    return this._http.post(`${this._api}/addtask` , {taskdata})
  }

  updatetask(taskdata:any){
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
