import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  addEmployee(data:any):Observable<any>{
    return this._http.post('https://localhost:7246/api/file',data);
  }

  getEmployee():Observable<any>{
    return this._http.get('https://localhost:7246/api/file');
  }

  updateEmployee(id:string ,data:any):Observable<any>{
    return this._http.put(`https://localhost:7246/api/file/updateEmployee/${id}`,data);
  }

  deleteEmployee(id:string):Observable<any>{
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

  getsingleemp(id:string):Observable<any>{
    return this._http.get(`http://localhost:3000/employees/${id}`);
  }

}
