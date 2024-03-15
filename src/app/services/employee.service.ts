import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  addEmployee(data:any):Observable<any>{
    return this._http.post('https://localhost:7246/api/Values',data);
  }

  getEmployee():Observable<any>{
    return this._http.get('https://localhost:7246/api/Values/getEmployee');
  }

  updateEmployee(id:string ,data:any):Observable<any>{
    return this._http.put(`https://localhost:7246/api/Values/updateEmployee/${id}`,data);
  }

  deleteEmployee(id:string):Observable<any>{
    return this._http.delete(`https://localhost:7246/api/Values/${id}`);
  }

  getsingleemp(id:string):Observable<any>{
    return this._http.get(`https://localhost:7246/api/Values/getEmployeebyuid/${id}`);
  }

  login(data:any):Observable<any>{
    return this._http.post('https://localhost:7246/api/User/login',data);
  }

}
