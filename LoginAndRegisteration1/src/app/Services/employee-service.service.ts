import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000/';

  //Request to create a Employee
  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createUser`, data);
  }

  //Request for Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, data);
  }

  //Requset for Delete employee
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteUser/` + id);
  }

  //Requset for fetching Employees Deails with pagination
  getAllUsers(
    pageNo: number | undefined,
    perPage: number = 200
  ): Observable<any> {
    return this.http.get<Employee[]>(
      `${this.baseUrl}getAllUsers` + `?pageNo=` + pageNo + `&perPage=` + perPage
    );
  }

  //Requset for fetching Employees Details
  getAllEmps(): Observable<any> {
    return this.http.get<Employee[]>(`${this.baseUrl}getAllEmps`);
  }

  //Requset for fetching Employee Details by Id
  getUsers(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}getUsers` + id);
  }

  //Requset for updating User
  updateUser(id: string, postData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}updateUser/` + id, postData);
  }

  //Auth Guard Service to get token
  loggedIn():boolean{
    return !!localStorage.getItem('token');
  }

}
